// Hey, peeping tom

import { squad_age_bar } from "@/plotting_tools/reusable_charts/squad_age_bar.js";
import { playerAgeMinutes } from "@/plotting_tools/reusable_charts/player_age_mins_chart.js";

import dataSquad from "/app/real-madrid/dummy_data2.json";
import dataAgeMins from "/app/real-madrid/dummy_json_new2.json";

const coloursDict = {
  highlight: "#FEBE10",
  text_axes: "#1e1e1e",
  muted_text: "#00529F",
};
const fontsDict = { body: "Barlow", header: "Changa" };

squad_age_bar("graph-2021", 2021, dataSquad, coloursDict, fontsDict);
squad_age_bar("graph-2021-repeat", 2021, dataSquad, coloursDict, fontsDict);
squad_age_bar("graph-2020", 2020, dataSquad, coloursDict, fontsDict);
squad_age_bar("graph-2019", 2019, dataSquad, coloursDict, fontsDict);
squad_age_bar("graph-2018", 2018, dataSquad, coloursDict, fontsDict);
squad_age_bar("graph-2017", 2017, dataSquad, coloursDict, fontsDict);

playerAgeMinutes(
  "mins-graph",
  ["Luka Modrić", "Karim Benzema", "Sergio Ramos", "Marcelo", "Gareth Bale"],
  dataAgeMins,
  coloursDict,
  fontsDict
);
playerAgeMinutes(
  "mins-graph-midfield",
  ["Luka Modrić", "Toni Kroos", "Casemiro"],
  dataAgeMins,
  coloursDict,
  fontsDict
);
playerAgeMinutes(
  "mins-graph-asensio",
  ["Marco Asensio"],
  dataAgeMins,
  coloursDict,
  fontsDict
);
