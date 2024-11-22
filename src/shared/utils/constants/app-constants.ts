export const config = {
    port : Number(process.env.PORT),
    saltRound : 10,
    accessTokenSecret : process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret : process.env.REFRESH_TOKEN_SECRET,
    maxUploadFileSize : 5 * 1024 * 1024,
}