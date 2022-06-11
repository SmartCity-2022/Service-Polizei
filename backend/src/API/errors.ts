
export default {
    POLICEMAN_NOT_FOUND: {
        status:"404",
        description: "Polizist/in konnte nicht gefunden werden"
    },
    POLICEMAN_CREATION_ERRORS: {
        status:"400",
        NO_NAME:{
            description: "kein Name fuer den Polizisten angegeben"
        },
        NO_FIRSTNAME: {
            description: "kein Vorname fuer den Polizisten angegeben"
        },
        IS_EMPTY: {
            description: "die Anfrage ist leer"
        }
    },
    POLICEMAN_NO_ID_FOUND: {
        status:"400",
        description: "keine Polizisten-ID gefunden"
    }
}