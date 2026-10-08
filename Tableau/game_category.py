import pandas as pd
import matplotlib.pyplot as plt


# ---------------------------------------------------------
# 1. Load the dataset
# ---------------------------------------------------------
df = pd.read_csv("popular_board_game.csv")


# ---------------------------------------------------------
# 2. Classify games based on solo support
# ---------------------------------------------------------
df["solo_support"] = df["min_players"].apply(
    lambda x: "Solo Supported" if x == 1 else "Solo Not Supported"
)


# ---------------------------------------------------------
# 3. Find the game with the highest number of ratings
#    for each category + solo support group
# ---------------------------------------------------------
most_rated_idx = (
    df.groupby(["category", "solo_support"])["num_ratings"]
      .idxmax()
)

most_rated = (
    df.loc[most_rated_idx, ["category", "solo_support", "name"]]
      .rename(columns={"name": "Most Rated Game"})
)


# ---------------------------------------------------------
# 4. Calculate the remaining statistics
# ---------------------------------------------------------
summary = (
    df.groupby(["category", "solo_support"])
      .agg(
          Game_Count=("name", "count"),
          Average_Rating=("avg_rating", "mean"),
          Average_Playtime=("playtime_num", "mean")
      )
      .reset_index()
)


# ---------------------------------------------------------
# 5. Combine statistics with most-rated game
# ---------------------------------------------------------
final_table = summary.merge(
    most_rated,
    on=["category", "solo_support"]
)


# ---------------------------------------------------------
# 6. Round averages to 2 decimal places
# ---------------------------------------------------------
final_table["Average_Rating"] = final_table["Average_Rating"].round(2)
final_table["Average_Playtime"] = final_table["Average_Playtime"].round(2)


# ---------------------------------------------------------
# 7. Rename columns for presentation
# ---------------------------------------------------------
final_table = final_table.rename(
    columns={
        "category": "Category",
        "solo_support": "Solo Support",
        "Game_Count": "Number of Games",
        "Average_Rating": "Average Rating",
        "Average_Playtime": "Average Playtime"
    }
)


# ---------------------------------------------------------
# 8. Reorder columns
# ---------------------------------------------------------
final_table = final_table[
    [
        "Category",
        "Solo Support",
        "Number of Games",
        "Most Rated Game",
        "Average Rating",
        "Average Playtime"
    ]
]


# ---------------------------------------------------------
# 9. Sort table
# ---------------------------------------------------------
final_table = final_table.sort_values(
    by=["Category", "Solo Support"]
).reset_index(drop=True)


# ---------------------------------------------------------
# 10. Print table for verification
# ---------------------------------------------------------
print(final_table.to_string(index=False))


# ---------------------------------------------------------
# 11. Optional: save the underlying results as a CSV
# ---------------------------------------------------------
final_table.to_csv("table.csv", index=False)


# ---------------------------------------------------------
# 12. Create table.png
# ---------------------------------------------------------
# Increase figure height automatically depending on row count.
fig_height = max(6, len(final_table) * 0.45)

fig, ax = plt.subplots(
    figsize=(16, fig_height)
)

ax.axis("off")

table = ax.table(
    cellText=final_table.values,
    colLabels=final_table.columns,
    cellLoc="center",
    colLoc="center",
    loc="center"
)

# Make the table readable.
table.auto_set_font_size(False)
table.set_fontsize(9)
table.scale(1, 1.5)

# Automatically adjust column widths.
table.auto_set_column_width(
    col=list(range(len(final_table.columns)))
)


# ---------------------------------------------------------
# 13. Add GT username
# ---------------------------------------------------------
fig.text(
    0.01,
    0.01,
    "nmunagala3",  # Replace if necessary
    ha="left",
    va="bottom",
    fontsize=10
)


# ---------------------------------------------------------
# 14. Save final image
# ---------------------------------------------------------
plt.savefig(
    "table.png",
    dpi=300,
    bbox_inches="tight"
)

plt.close()
