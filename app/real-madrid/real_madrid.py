"""
Code to convert the `squad_data.csv` to a json
"""

from enum import Enum
import pandas as pd


class positionsEnum(Enum):
    def __new__(cls, value, peak_start, peak_end):
        obj = object.__new__(cls)
        obj._value_ = value
        obj.peak_start = peak_start
        obj.peak_end = peak_end
        return obj

    # Ages based on basic range of 24-28, adjusted for particularly explosive/
    # not explosive positional groups
    GOALKEEPER = "GK", 26, 30
    LEFT_BACK = "LB", 23, 27
    CENTRE_BACK = "CB", 25, 29
    RIGHT_BACK = "RB", 23, 27
    DEFENSIVE_MIDFIELDER = "DM", 24, 28
    CENTRAL_MIDFIELDER = "CM", 24, 28
    ATTACKING_MIDFIELDER = "AM", 24, 28
    WINGER = "W", 23, 27
    STRIKER = "ST", 24, 28


positions_dict = {
    "Thibaut Courtois": positionsEnum.GOALKEEPER,
    "Éder Militão": positionsEnum.CENTRE_BACK,
    "Vinicius Júnior": positionsEnum.WINGER,
    "David Alaba": positionsEnum.CENTRE_BACK,
    "Casemiro": positionsEnum.DEFENSIVE_MIDFIELDER,
    "Karim Benzema": positionsEnum.STRIKER,
    "Luka Modrić": positionsEnum.CENTRAL_MIDFIELDER,
    "Toni Kroos": positionsEnum.CENTRAL_MIDFIELDER,
    "Federico Valverde": positionsEnum.ATTACKING_MIDFIELDER,
    "Ferland Mendy": positionsEnum.LEFT_BACK,
    "Dani Carvajal": positionsEnum.RIGHT_BACK,
    "Nacho": positionsEnum.CENTRE_BACK,
    "Lucas Vázquez": positionsEnum.WINGER,
    "Rodrygo": positionsEnum.WINGER,
    "Marco Asensio": positionsEnum.ATTACKING_MIDFIELDER,
    "Eduardo Camavinga": positionsEnum.CENTRAL_MIDFIELDER,
    "Eden Hazard": positionsEnum.WINGER,
    "Marcelo": positionsEnum.RIGHT_BACK,
    "Luka Jović": positionsEnum.STRIKER,
    "Mariano": positionsEnum.STRIKER,
    "Andriy Lunin": positionsEnum.GOALKEEPER,
    "Jesús Vallejo": positionsEnum.CENTRE_BACK,
    "Isco": positionsEnum.ATTACKING_MIDFIELDER,
    "Dani Ceballos": positionsEnum.CENTRAL_MIDFIELDER,
    "Miguel Gutiérrez": positionsEnum.LEFT_BACK,
    "Gareth Bale": positionsEnum.WINGER,
    "Blanco": positionsEnum.DEFENSIVE_MIDFIELDER,
    "Peter González": positionsEnum.WINGER,
    "Mario Gila": positionsEnum.CENTRE_BACK,
    "Sergio Santos": positionsEnum.RIGHT_BACK,
    "Latasa": positionsEnum.STRIKER,
    "Rafa": positionsEnum.CENTRE_BACK,
    "Álvaro Odriozola": positionsEnum.RIGHT_BACK,
    "Luis López": positionsEnum.GOALKEEPER,
    "Diego Piñeiro": positionsEnum.GOALKEEPER,
    "Toni Fuidias": positionsEnum.GOALKEEPER,
    "Raphaël Varane": positionsEnum.CENTRE_BACK,
    "Sergio Ramos": positionsEnum.CENTRE_BACK,
    "Martin Ødegaard": positionsEnum.CENTRAL_MIDFIELDER,
    "Víctor Chust": positionsEnum.CENTRE_BACK,
    "Sergio Arribas": positionsEnum.CENTRAL_MIDFIELDER,
    "Marvin": positionsEnum.ATTACKING_MIDFIELDER,
    "Hugo Duro": positionsEnum.STRIKER,
    "Borja Mayoral": positionsEnum.STRIKER,
    "Alphonse Areola": positionsEnum.GOALKEEPER,
    "James Rodríguez": positionsEnum.ATTACKING_MIDFIELDER,
    "Brahim Díaz": positionsEnum.CENTRAL_MIDFIELDER,
    "Keylor Navas": positionsEnum.GOALKEEPER,
    "Sergio Reguilón": positionsEnum.LEFT_BACK,
    "Marcos Llorente": positionsEnum.CENTRAL_MIDFIELDER,
    "Javi Sánchez": positionsEnum.CENTRE_BACK,
    "Luca Zidane": positionsEnum.GOALKEEPER,
    "Cristo González": positionsEnum.STRIKER,
    "Francisco Garcia": positionsEnum.LEFT_BACK,
    "Álvaro Fidalgo": positionsEnum.ATTACKING_MIDFIELDER,
    "Cristiano Ronaldo": positionsEnum.STRIKER,
    "Mateo Kovačić": positionsEnum.CENTRAL_MIDFIELDER,
    "Theo Hernández": positionsEnum.LEFT_BACK,
    "Kiko Casilla": positionsEnum.GOALKEEPER,
    "Achraf Hakimi": positionsEnum.RIGHT_BACK,
    "Álvaro Tejero": positionsEnum.RIGHT_BACK,
    "Óscar Rodríguez Arnaiz": positionsEnum.ATTACKING_MIDFIELDER,
    "Franchu Feuillassier": positionsEnum.WINGER,
    "Luismi Quezada": positionsEnum.LEFT_BACK,
    "Jaime Seoane": positionsEnum.CENTRAL_MIDFIELDER,
}

foo = pd.read_csv(
    "~/Documents/Github/git_pages_test/projects/real_madrid/squad_data.csv"
)

foo["Player"] = [i.split("\\")[0] for i in foo["Player"]]
foo = foo[foo["MP"] > 0]

# {i: "" for i in foo["Player"].unique() if i not in positions_dict.keys()}

foo["position_detail"] = [positions_dict[i].value for i in foo["Player"]]

peak_status = []
for _, row in foo.iterrows():
    position_enum = positionsEnum(row["position_detail"])

    if row["Age"] < position_enum.peak_start:
        peak_status.append("pre-peak")
    elif row["Age"] <= position_enum.peak_end:
        peak_status.append("peak-age")
    else:
        peak_status.append("post-peak")

foo["peak_status"] = peak_status

empty_list = []

for season in foo["Season"].unique():
    subfoo = foo[foo["Season"] == season]

    pre_peak_players = [
        {
            "name": player["Player"],
            "age": player["Age"],
            "position": player["position_detail"],
            "minutes": player["Min"],
        }
        for _, player in subfoo.iterrows()
        if player["peak_status"] == "pre-peak"
    ]

    peak_age_players = [
        {
            "name": player["Player"],
            "age": player["Age"],
            "position": player["position_detail"],
            "minutes": player["Min"],
        }
        for _, player in subfoo.iterrows()
        if player["peak_status"] == "peak-age"
    ]

    post_peak_players = [
        {
            "name": player["Player"],
            "age": player["Age"],
            "position": player["position_detail"],
            "minutes": player["Min"],
        }
        for _, player in subfoo.iterrows()
        if player["peak_status"] == "post-peak"
    ]

    pre_peak_mins = sum([player["minutes"] for player in pre_peak_players])

    peak_age_mins = sum([player["minutes"] for player in peak_age_players])

    post_peak_mins = sum([player["minutes"] for player in post_peak_players])

    total_mins = pre_peak_mins + peak_age_mins + post_peak_mins

    season_json = [
        {
            "type": "pre-peak",
            "percentage": pre_peak_mins / total_mins,
            "players": pre_peak_players,
        },
        {
            "type": "peak-age",
            "percentage": peak_age_mins / total_mins,
            "players": peak_age_players,
        },
        {
            "type": "post-peak",
            "percentage": post_peak_mins / total_mins,
            "players": post_peak_players,
        },
    ]

    empty_list.append({"season": season, "data": season_json})
