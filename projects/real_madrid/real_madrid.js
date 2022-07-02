// Lemme think about what I'm going to need

import { squad_age_bar } from "/src/reusable_charts/squad_age_bar.js";
import { playerAgeMinutes } from "/src/reusable_charts/player_age_mins_chart.js";

const dataPathSquad = "./dummy_data2.json"
const dataPathAgeMins = "./dummy_json_new2.json"
const coloursDict = {"highlight": "#FEBE10", "text_axes": "#1e1e1e", "muted_text": "#00529F"}
const fontsDict = {"body": "Barlow", "header": "Changa"}

squad_age_bar("graph-2021", 2021, dataPathSquad, coloursDict, fontsDict);
squad_age_bar("graph-2021-repeat", 2021, dataPathSquad, coloursDict, fontsDict);
squad_age_bar("graph-2020", 2020, dataPathSquad, coloursDict, fontsDict);
squad_age_bar("graph-2019", 2019, dataPathSquad, coloursDict, fontsDict);
squad_age_bar("graph-2018", 2018, dataPathSquad, coloursDict, fontsDict);
squad_age_bar("graph-2017", 2017, dataPathSquad, coloursDict, fontsDict);

playerAgeMinutes("mins-graph", ["Luka Modrić", "Karim Benzema", "Sergio Ramos", "Marcelo", "Gareth Bale"], dataPathAgeMins, coloursDict, fontsDict);
playerAgeMinutes("mins-graph-midfield", ["Luka Modrić", "Toni Kroos", "Casemiro"], dataPathAgeMins, coloursDict, fontsDict);