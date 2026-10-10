const vlSpec_a = {
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  "title": {
   "text": "Number of Ratings 2016-2020",
   "subtitle": "nmunagala3"
  },
  "data": {
      "url": "boardgame_ratings.csv",
      "format": {
        "type": "csv",
        "parse": {
            "date": "date"
        }
      }
  },
  "transform": [
    {
	"fold": [
                "Catan=count",
                "Dominion=count",
                "Codenames=count",
                "Terraforming Mars=count",
                "Gloomhaven=count",
                "Magic: The Gathering=count",
                "Dixit=count",
                "Monopoly=count"
            ],
        "as": ["gameName", "countNum"]
    },
    {
        "calculate": "replace(datum.gameName, '=count', '')",
        "as": "gameName"
    }
  ],

  "mark": "line",

  "encoding": {
    "x": {
        "field": "date",
        "type": "temporal",
        "title": "Month"
    },
    "y": {
        "field": "countNum",
        "type": "quantitative",
        "title": "Num of Ratings"
    },
    "color": {
        "field": "gameName",
        "type": "nominal"
    }
  },
  "axis": {
    "tickCount": {"interval": "month", "step": 3},
    "format": "%b %y",
    "title": "Month"
  }
};

vegaEmbed('#svg-a', vlSpec_a, { renderer: 'svg' })
  .catch(console.error);

function vega_lite_spec_a() {
  return vlSpec_a;
}
function vega_spec_a() {
  return vegaLite.compile(vega_lite_spec_a()).spec;
}
