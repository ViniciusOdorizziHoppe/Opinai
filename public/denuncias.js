app.get('/api/denuncias', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT gravidade, latitude, longitude FROM denuncias'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar denúncias' });
  }
});
