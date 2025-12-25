import z from 'zod';

const signUpFormSchema = z.object({
    username: z.string().min(2, {
        message: 'Enter username.'
    }),
    firstName: z.string().min(2, {
        message: 'Enter first name.'
    }),
    lastName: z.string().min(2, {
        message: 'Enter last name.'
    }),
    email: z.email({
        message: 'Enter email.'
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters.'
    })
});

export {signUpFormSchema};
