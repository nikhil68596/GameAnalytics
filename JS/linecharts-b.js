const vlSpec_b = {
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
   "title": {
        "text": "Number of Ratings 2016-2020 with Rankings",
        "subtitle": "Numbers inside circles represent board-game rankings"
    },

    "width": 650,
    "height": 500,

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
        },
        {
            "calculate": "toNumber(datum.countNum)",
            "as": "countNum"
        },
        {
            "calculate": "datum.gameName === 'Catan' ? toNumber(datum['Catan=rank']) : datum.gameName === 'Codenames' ? toNumber(datum['Codenames=rank']) : datum.gameName === 'Terraforming Mars' ? toNumber(datum['Terraforming Mars=rank']) : datum.gameName === 'Gloomhaven' ? toNumber(datum['Gloomhaven=rank']) : null",
            "as": "rank"
        }
    ],

    "encoding": {
        "x": {
            "field": "date",
            "type": "temporal",
            "axis": {
                "title": "Month",
                "tickCount": {
                    "interval": "month",
                    "step": 3
                },
                "format": "%b %y"
            }
        },
        "y": {
            "field": "countNum",
            "type": "quantitative",
            "title": "Num of Ratings"
        }
    },

    "layer": [
        {
            "mark": {
                "type": "line",
                "strokeWidth": 2
            },
            "encoding": {
                "color": {
                    "field": "gameName",
                    "type": "nominal",
                    "scale": {
                        "scheme": "category10"
                    }
                }
            }
        },
        {
            "transform": [
                {
                    "filter": "month(datum.date) % 3 == 0 && isValid(datum.rank) && datum.rank > 0"
                }
            ],
            "mark": {
                "type": "circle",
                "size": 750
            },
            "encoding": {
                "color": {
                    "field": "gameName",
                    "type": "nominal",
                    "scale": {
                        "scheme": "category10"
                    }
                }
            }
        },
        {
            "transform": [
                {
                    "filter": "month(datum.date) % 3 == 0 && isValid(datum.rank) && datum.rank > 0"
                }
            ],
            "mark": {
                "type": "text",
                "fontSize": 10,
                "fontWeight": "bold"
            },
            "encoding": {
                "text": {
                    "field": "rank",
                    "type": "quantitative",
                    "format": ".0f"
                },
                "color": {
                    "value": "white"
                }
            }
        },
        {
    "transform": [
        {
            "aggregate": [
                { "op": "count", "as": "total" }
            ]
        }
    ],
    "mark": {
        "type": "text",
        "fontSize": 14,
        "fontWeight": "bold",
        "align": "right",
        "baseline": "bottom"
    },
    "encoding": {
        "x": { "value": 640 },
        "y": { "value": 490 },
        "text": { "value": "nmunagala3" },
        "color": { "value": "black" }
    }
}
    ]
};

vegaEmbed('#svg-b', vlSpec_b, { renderer: 'svg' }).catch(console.error);

function vega_lite_spec_b() {
  return vlSpec_b;
}
function vega_spec_b() {
  return vegaLite.compile(vega_lite_spec_b()).spec;
}
