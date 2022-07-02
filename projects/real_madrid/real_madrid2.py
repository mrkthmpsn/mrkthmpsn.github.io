"""
Code to convert the `squad_data.csv` to a json for age-minute charts
"""


import pandas as pd

foo = pd.read_csv(
    "~/Documents/Github/git_pages_test/projects/real_madrid/squad_data.csv"
)

foo["Player"] = [i.split("\\")[0] for i in foo["Player"]]
foo = foo[foo["MP"] > 0]

player_list = foo["Player"].unique()

player_records = []
for player in player_list:
    temp_df = foo[foo["Player"] == player].sort_values("Season").reset_index()
    player_seasons = []
    for i, row in temp_df.iterrows():
        player_seasons.append(
            {
                "name": row["Player"],
                "age": row["Age"],
                "mins": row["Min"],
                "season": row["Season"],
                "end_data": i == (len(temp_df) - 1),
            }
        )
    player_records.append({"name": player, "seasons": player_seasons})
