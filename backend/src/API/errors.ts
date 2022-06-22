
export default {
    general:"something went wrong",
    POLICEMAN:{
        POLICEMAN_NOT_FOUND: {
            status:404,
            description: "Polizist/in konnte nicht gefunden werden"
        },
        POLICEMAN_NO_ID_FOUND: {
            status:400,
            description: "keine Polizisten-ID gefunden"
        },
        POLICEMAN_CREATION_ERRORS: {
            status:400,
            NO_NAME:{
                status:400,
                description: "kein Name fuer den Polizisten angegeben"
            },
            NO_FIRSTNAME: {
                status:400,
                description: "kein Vorname fuer den Polizisten angegeben"
            },
            IS_EMPTY: {
                status:400,
                description: "die Anfrage ist leer"
            }
        }
    }, ADRESSES:{
        ADRESS_NOT_FOUND: {
            status:404,
            description:"Adresse nicht gefunden"
        },
        ADRESS_ID_NOT_FOUND:{
            status:400,
            description:"keine Adressen-ID gefunden"
        },
        ADRESS_CREATION_ERRORS:{
            status:400,
            general:"something went wrong",
            NO_PLZ:{
                status:400,
                description:"keine PLZ angegeben"
            },
            NO_LOCATION:{
                status:400,
                description:"keinen Ort angegeben"
            },
            NO_STREET:{
                status:400,
                description:"keine Strasse angegeben"
            },
            WRONG_TYPE_FOR_HOUSENUMBER:{
                status:400,
                description:"ungultige Hausnummer"
            },
            IS_EMPTY: {
                status:400,
                description: "die Anfrage ist leer"
            }
        },
        ADRESS_BY_PARAMS_ERRORS:{
            status:400,
            NO_PLZ:{
                status:400,
                description:"keine PLZ angegeben"
            },
            NO_LOCATION:{
                status:400,
                description:"keinen Ort angegeben"
            },
            NO_STREET:{
                status:400,
                description:"keine Strasse angegeben"
            },
            WRONG_TYPE_FOR_HOUSENUMBER:{
                status:400,
                description:"ungultige Hausnummer"
            },
            IS_EMPTY: {
                status:400,
                description: "die Anfrage ist leer"
            },
            NOT_FOUND: {
                status:404,
                description: "Adresse nicht gefunden"
            }
        }
    },
    ACCIDENTS:{
        ACCIDENT_ID_NOT_FOUND:{
            status:404,
            description: "Unfall mit dieser ID konnte nicht gefunden werden"
        },
        ACCIDENT_CREATION_ERRORS:{
            INVALID_DATE:{
                status:400,
                description:"ungueltiges Datum"
            },
            INVALID_BODY:{
                status:400,
                description:"kein Body gefunden"
            },


        }
    },
    TRAFFIC_JAMS:{
        TRAFFIC_JAM_ID_NOT_FOUND:{
            status:404,
            description: "Unfall mit dieser ID konnte nicht gefunden werden"
        },
        TRAFFIC_JAM_CREATION_ERRORS:{
            INVALID_DATE:{
                status:400,
                description:"ungueltiges Datum"
            },
            INVALID_BODY:{
                status:400,
                description:"kein Body gefunden"
            },
        }
    },
    WANTED_PERSON:{
        WANTED_PERSON_ID_NOT_FOUND:{
            status:404,
            description:"gesuchte-Personen-ID nicht gefunden"
        },
        WANTED_PERSON_CREATION_ERRORS:{
            INVALID_BODY: {
                status: 400,
                description: "kein body angegeben"
            }
        }
    },
    REPORT:{
        REPORT_ID_NOT_FOUND:{
            status:404,
            description:"gesuchte-Anzeigen-ID nicht gefunden"
        },
        REPORT_CREATION_ERRORS:{
            INVALID_BODY:{
                status: 400,
                description: "kein Body angegeben"
            },
            NO_PLZ:{
                status:400,
                description:"keine PLZ angegeben"
            },
            NO_LOCATION:{
                status:400,
                description:"keinen Ort angegeben"
            },
            NO_STREET:{
                status:400,
                description:"keine Strasse angegeben"
            },
            WRONG_TYPE_FOR_HOUSENUMBER:{
                status:400,
                description:"ungultige Hausnummer"
            },
            INVALID_EMAIL:{
                status:400,
                description:"ungültige Email-Adresse"
            },
            INVALID_NAME:{
                status:400,
                description:"ungültiger Name der angezeigten Person"
            },
            INVALID_FIRST_NAME:{
                status:400,
                description:"ungültiger Vorname der angezeigten Person"
            },
            INVALID_DATE:{
                status:400,
                description:"ungültiges Datum"
            },


        }
    }

}