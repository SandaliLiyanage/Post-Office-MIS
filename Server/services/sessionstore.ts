class SessionStore{
    private static instance: SessionStore;
    static getInstance(): SessionStore{
        if(!SessionStore.instance){
            SessionStore.instance = new SessionStore();
        }
        return SessionStore.instance;
    }
    async storeSession(username:string){
        console.log("session stored", username)
    }

}
export default SessionStore