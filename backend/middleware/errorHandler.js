const errorHandler = (err, req, res, next) => {
    console.error('❌ Error: Помилка сервера:', err.message);
    res.status(500).json({ message: 'Error: Помилка сервера', error: err.message });
};

export default errorHandler;
