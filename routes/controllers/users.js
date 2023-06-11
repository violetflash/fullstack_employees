const {prisma} = require("../../prisma/prisma-client");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @route POST /api/user/login
 * @desс Логин
 * @access Public
 */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Пожалуйста, заполните обязательные поля' });
        }

        const user = await prisma.user.findFirst({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(400).json({ message: 'Пользователя с указанным логином не существует' });
        }

        // сравнение указанного при ологине пароля с хэшированным паролем юзера в ДБ
        const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));
        const secret = process.env.JWT_SECRET;

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Неверно введен пароль' })
        }

        if (user && isPasswordCorrect && secret) {
            res.status(200).json({
                id: user.id,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
            })
        }
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
}

/**
 * @route POST /api/user/register
 * @desс Регистрация
 * @access Public
 */
const registerUser = async (req, res) => {
    try {
        const { email, password, firstname, lastname } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Пожалуйста, укажите email' });
        }

        if (!password) {
            return res.status(400).json({ message: 'Пожалуйста, укажите пароль' });
        }

        if (!firstname) {
            return res.status(400).json({ message: 'Пожалуйста, укажите имя пользователя' });
        }

        if (!lastname) {
            return res.status(400).json({ message: 'Пожалуйста, укажите фамилию пользователя' });
        }

        const alreadyRegisteredUser = await prisma.user.findFirst({
            where: {
                email
            }
        });

        if (alreadyRegisteredUser) {
            return res.status(400).json({ message: 'Пользователь с указанным email уже существует' });
        }

        // строка для усиления безопасности пароля. Будет добавляться к хэшу
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                email,
                firstname,
                lastname,
                password: hashedPassword, // в поле записывается хэш пароля,
                // admin_identifier: {
                //     first_name: 'Alex',
                //     last_name: 'Grobovsky',
                //     is_admin: true,
                // },
            }
        });

        console.log('user:', user);

        // токен юзера будет выдаваться сразу после регистрации
        const secret = process.env.JWT_SECRET;

        if (!user || !secret) {
            return res.status(400).json({ message: 'Не удалось создать пользователя' })
        }

        if (user && secret) {
            res.status(201).json({
                id: user.id,
                email,
                firstname,
                lastname,
                token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
            })
        }
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }

}

/**
 * @route GET /api/user/profile
 * @desс Профиль юзера
 * @access Private
 */
const getUserProfile = async (req, res) => {
    return res.status(200).json(req.user);
}

module.exports = {
    loginUser,
    registerUser,
    getUserProfile
}