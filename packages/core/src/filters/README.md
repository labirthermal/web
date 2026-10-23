# Hlavní filtry

Transformace (rotace + převrácení)

Emisivita

Posunout teploty

Přeskakovat snímky

Změnit jednotky

# Logika

Všechny filtry je možné dávat na jakýkoliv element v hierarchii.

Při změně jakéhokoliv parametru filtru se přepočítají všechny elementy níže v hierarchii.

Filtr představuje vždy asynchronní task nad načteným souborem.

Tento filtr se vypočítá vždy nad array bufferem načteného souboru.

Po změně filtru se stane toto:

1. změní se array buffer dotčených instancí
2. přepočítá se minmax instancí, grup a registru
3. přepočítá se range instancí a registru
4. dojde k přepočítání všech analýz
5. timeline se nastaví vždy na 0
4. dojde k překreslení instancí (což vyžádá unmount a mount)