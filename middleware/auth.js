const jwt = require('jsonwebtoken');
const { prisma } = require('../prisma/prisma-client');

const checkAuthMiddleware = async (req, res, next) => {
    try {
        // заголовок авторизации приходит в виде строки:
        // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg2NDAyNDYyLCJleHAiOjE2ODg5OTQ0NjJ9._zKsDhSNYDQ_qCto62W8eFbPTf-FDfsr7w3HSS6FQxU"
        // откуда требуется достать сам токен
        let token = req.headers.authorization?.split(' ')[1];
        //  с помощью секретного ключа декодируем токен, и достаем переданный
        //  в него в контроллере пэйлоад (jwt.sign(пейлоад --> { id: user.id } <--, secret, { expiresIn: '30d' })) .
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        });

        // в сам запрос сохраняем юзера, чтобы передать управление следующей функции,
        // которая уже будет проверять, существует ли такой юзер
        req.user = user;
        // передаем управление следующей функции
        next();
    } catch (err) {
        res.status(401).json({ message: 'Не авторизован' })
    }
};

module.exports = {
    checkAuthMiddleware
}
