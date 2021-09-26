import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    header: {
        backgroundColor: '#bdd4de',
        width: '100%',
        textAlign: 'center',
        height: 'auto',
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        backgroundColor: '#bdd4de',
        width: '100%',
        textAlign: 'center',
        height: 'auto',
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gameboard: {       
        flexDirection: 'row',   
    },
    gameinfo: {       
        alignItems: 'center',        
    },
    item: {       
        margin: 8,
        borderRadius: 10,
    },
    bigtext: {
        color: '#3b697d',
        fontSize: 22,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    infotext: {
        marginBottom: 20,
        fontSize: 18,
    },
    button: {
        padding: 10,
        backgroundColor: 'lightblue',
        textAlign: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 6,
    },
    buttontext: {
        fontSize: 16,
        letterSpacing: 1,
    }
});
