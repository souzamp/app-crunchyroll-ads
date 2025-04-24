import axios from "axios";

const api = axios.create({
        /*
    O IP http://10.0.2.2 é comumente usado em desenvolvimento quando você está rodando seu app React Native no 
    emulador Android (especialmente com o Android Emulator do Android Studio) e quer que ele se conecte à máquina 
    host (seu computador).
    
    Por que 10.0.2.2?
    Quando você usa o emulador Android:O próprio emulador funciona como uma máquina virtual separada.
    localhost ou 127.0.0.1 dentro do emulador aponta para ele mesmo, não para seu computador.

    O Android Emulator, por padrão, redireciona o IP 10.0.2.2 para o localhost da máquina host 
    (ou seja, seu computador). Isso é uma ponte especial criada pelo emulador.
    */
    baseURL: 'http://localhost:8080/'

})

export default api;