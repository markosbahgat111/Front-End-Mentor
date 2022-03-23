export interface IComment {
        content:string,
        id:number,
        createdAt:string,
        replies:[],
        score:number,
        user:{
            image:{
                png:string,
                webp:string
            },
            username:string

        }
}