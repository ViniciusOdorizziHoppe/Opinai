import os
import torch
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image
import numpy as np

# --- Modelo pré-treinado ---
model = models.resnet50(weights=models.ResNet50_Weights.DEFAULT)
model.eval()  # modo avaliação

preprocess = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# --- Função para extrair features ---
def extrair_features(caminho_imagem):
    image = Image.open(caminho_imagem).convert("RGB")
    tensor = preprocess(image).unsqueeze(0)
    with torch.no_grad():
        features = model(tensor)
    return features.squeeze().numpy()

# --- Função para classificar ---
def classificar_imagem(caminho_imagem, features_treino, threshold=0.6):
    feat = extrair_features(caminho_imagem)
    melhor_topico = None
    melhor_similaridade = -1

    for topico, feats in features_treino.items():
        for f in feats:
            sim = np.dot(feat, f) / (np.linalg.norm(feat) * np.linalg.norm(f))
            if sim > melhor_similaridade:
                melhor_similaridade = sim
                melhor_topico = topico

    if melhor_similaridade >= threshold:
        return melhor_topico  # aprovado
    return None  # não aprovado

# --- Preparar banco de imagens de referência ---
# Coloque aqui os caminhos das imagens de treino para cada categoria
treinamento = {
    "lixo": [
        "IA Assets/lixo/16_brasil_gera_82milhoes_de_toneladas_de_lixo_recicla_apenas_2_porcento_padrao.jpg",
        "IA Assets/lixo/16_mais_de_70_porcento_dos_brasileiros_nao_separa_lixo_padrao.jpg",
        "IA Assets/lixo/images.jpg",
        "IA Assets/lixo/poluição.jpg"
    ],
    "buraco": [
        "IA Assets/buraco/c47c6009cc5b6092863734bdad9d701e.png",
        "IA Assets/buraco/causas-dos-buracos-nas-rodovias-do-brasil.jpg",
        "IA Assets/buraco/images.jpg",
        "IA Assets/buraco/istockphoto-174662203-612x612.jpg",
        "IA Assets/buraco/istockphoto-929942316-612x612.jpg"
    ],
    "semaforo": [
        "IA Assets/semáforo/aproximacao-de-um-semaforo-quebrado-com-um-sinal-de-luz-vermelha-iluminada-no-chao_665346-25324.jpg",
        "IA Assets/semáforo/images.jpg",
        "IA Assets/semáforo/semáforo-2.jpg"
    ],
    "bueiro": [
        "IA Assets/bueiro/734e9563f0abe2e3dd73caee9b6e9b53.jpg",
        "IA Assets/bueiro/bueiro.jpg",
        "IA Assets/bueiro/download.jpg",
        "IA Assets/bueiro/Xaxim-bueiro-sujo-1024x768.jpeg"
    ]
}

features_treino = {}
for topico, imagens in treinamento.items():
    features_treino[topico] = [extrair_features(img) for img in imagens]

# --- Função para processar múltiplas imagens de clientes ---
def processar_imagens(pasta_imagens):
    aprovadas = []
    imagens = [f for f in os.listdir(pasta_imagens) if f.lower().endswith((".jpg", ".jpeg", ".png"))]
    for img in imagens:
        caminho = os.path.join(pasta_imagens, img)
        resultado = classificar_imagem(caminho, features_treino)
        if resultado:
            aprovadas.append((img, resultado))  # pronto para enviar ao banco
    return aprovadas

# --- Exemplo de uso ---
if __name__ == "__main__":
    pasta_cliente = "caminho/para/imagens_enviadas"
    aprovadas = processar_imagens(pasta_cliente)
    # Aqui você poderia enviar 'aprovadas' diretamente para o banco de dados
