export interface ILoginResponse {
    token: string;
    accessToken: string;
    refreshToken: string;
    user: {
        email: string;
        name: string;
        role: string;
        status: string;
        isDeleted: boolean;
        emailVerified: boolean;
    }
}