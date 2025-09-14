import os
from PIL import Image
import torch
import torchvision.transforms as transforms
import torchvision.models as models
from torchvision.transforms.functional import to_tensor
import numpy as np

# --- Modelo para extrair features ---
print("Carregando modelo ResNet50 pré-treinado...")
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
    tensor = preprocess(image).unsqueeze(0)  # batch de 1
    with torch.no_grad():
        features = model(tensor)
    return features.squeeze().numpy()


# --- Tópicos e imagens de treinamento ---
# Coloque aqui pastas de exemplo com imagens para treinar cada tópico
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

# Extrair features das imagens de treino
print("Processando imagens de treino...")
features_treino = {}
for topico, imagens in treinamento.items():
    features_treino[topico] = [extrair_features(img) for img in imagens]


# --- Função para classificar nova imagem ---
def classificar_imagem(caminho_imagem):
    feat = extrair_features(caminho_imagem)
    melhor_topico = None
    melhor_similaridade = -1

    for topico, feats in features_treino.items():
        for f in feats:
            # Similaridade por cosseno
            sim = np.dot(feat, f) / (np.linalg.norm(feat) * np.linalg.norm(f))
            if sim > melhor_similaridade:
                melhor_similaridade = sim
                melhor_topico = topico

    if melhor_similaridade < 0.6:
        return f"POSSÍVEL RELEVANTE (similaridade {melhor_similaridade:.2f})"
    else:
        return f"ACEITA ({melhor_topico}) - similaridade {melhor_similaridade:.2f}"


# --- Teste ---
if __name__ == "__main__":
    caminho = input("Digite o caminho da imagem ou pasta: ")

    if os.path.isfile(caminho):
        print(f"{os.path.basename(caminho)} → {classificar_imagem(caminho)}")
    elif os.path.isdir(caminho):
        imagens = [f for f in os.listdir(caminho) if f.lower().endswith((".png", ".jpg", ".jpeg"))]
        for img in imagens:
            caminho_imagem = os.path.join(caminho, img)
            print(f"{img} → {classificar_imagem(caminho_imagem)}")
    else:
        print("Caminho inválido.")

