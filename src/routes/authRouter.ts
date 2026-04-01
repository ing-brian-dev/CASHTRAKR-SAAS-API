import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middlewares/handleInputErrors";
import { authenticate } from "../middlewares/auth";
import { limiter } from "../config/limiter";

const authRouter = Router();

authRouter.use(limiter);

authRouter.post('/create-account',
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('email').isEmail().withMessage('Dirección de correo electrónico inválida'),
    handleInputErrors,
    AuthController.createAccount
);

authRouter.post('/confirm-account',
    body('token')
        .notEmpty().withMessage('Token no válido')
        .isLength({ min: 6, max: 6 }).withMessage('Token no valido'),
    handleInputErrors,
    AuthController.confirmAccount
)

authRouter.post('/login',
    body('email').isEmail().withMessage('Disrección de correo electrónico inválida'),
    body("password")
        .isLength({ min: 8 })
        .withMessage("El pasword es requerido y requiere 8 caracteres"),
    handleInputErrors,
    AuthController.login
);

authRouter.post('/forgot-password',
    body('email').isEmail().withMessage('Disrección de correo electrónico inválida'),
    handleInputErrors,
    AuthController.forgotPassword
);

authRouter.post('/validate-token',
    body('token')
        .notEmpty().withMessage('Token no válido')
        .isLength({ min: 6, max: 6 }).withMessage('Token no valido'),
    handleInputErrors,
    AuthController.validateToken
);

authRouter.post('/reset-password/:token',
    param('token')
        .notEmpty().withMessage('Token no válido')
        .isLength({ min: 6, max: 6 }).withMessage('Token no valido'),
    body("password")
        .isLength({ min: 8 })
        .withMessage("El pasword es requerido y requiere 8 caracteres"),
    handleInputErrors,
    AuthController.resetPasswordWithToken
);

authRouter.get('/user',
    authenticate,
    AuthController.user
);

authRouter.put('/user',
    authenticate,
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('email')
    .notEmpty().withMessage('El email es requerido')
    .isEmail().withMessage('El email no es valido'),
    handleInputErrors,
    AuthController.updateUser
);

authRouter.post('/update-password',
    authenticate,
    body("current_password")
        .notEmpty()
        .withMessage("El current_password es requerido"),
    body("new_password")
        .isLength({ min: 8 })
        .withMessage("El pasword es requerido y requiere 8 caracteres"),
    handleInputErrors,
    AuthController.updateCurrentUserPassword
);

authRouter.post('/check-password',
    authenticate,
    body("current_password")
        .notEmpty()
        .withMessage("El current_password es requerido"),
    handleInputErrors,
    AuthController.checkPassword

);

export default authRouter;
