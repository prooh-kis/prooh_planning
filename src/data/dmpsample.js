[{
    "location": "CyberHub Gurgaon",
    "data": {
        "totalAudience": [
            {
                "weekdays": {
                    "days": 22,
                    "camera_data": {
                        "source_a": 1000, // count
                        "source_b": 1000, // count
                        "source_c": 1000, // count
                    }, // total = 3000
                    "dfmd_data": 3000, // count
                    "traffic_data": 3000, // count
                }, // average count = 3000 x 22 = 66000
                "saturdays": {
                    "days": 4,
                    "camera_data": {
                        "source_a": 1000, // count
                        "source_b": 1000, // count
                        "source_c": 1000, // count
                    }, // total = 3000
                    "dfmd_data": 7000, // count
                    "traffic_data": 8000, // count
                }, // average count = 5000 x 4 = 20000
                "sundays": {
                    "days": 4,
                    "camera_data": {
                        "source_a": 1000, // count
                        "source_b": 1000, // count
                        "source_c": 1000, // count
                    }, // total = 3000
                    "dfmd_data": 4000, // count
                    "traffic_data": 0, // count
                }, // total count = 3500 x 4 = 14000
            },
  
        ],// 66000 + 20000 + 14000 = 100000 total count = 100k monthly
        "audience": [
            {
                "type": "Working Professionals-A",
                "percentage": 0.15, // % of total audience = 100000 x 0.15 = 15000 = 15k monthly
                "gene": [
                    {
                        "gender": "Male",
                        "weight": 0.7, // % of percentage = 0.7 x 15000 = 10500 = 10.5k monthly
                        "weekdays": {
                            "days": 22, // no. of days
                            "monthly": 0.7, // % of weight = 10500 x 0.7 = 7350
                            "daily": 0.03, // % of weight = 0.7 / 22 = 0.031 &&  7350 / 22 = 334.09
                            "unique": 0.3, // % of daily % = 0.3 x 334.09 = 100.22
                            "cohort": {
                                "morning": 0.5, // % of daily = 0.5 x 334.09 = 167.045
                                "afternoon": 0.1, // % of daily = 0.1 x 334.09 = 33.409
                                "evening": 0.2, // % of daily = 0.2 x 334.09 = 66.818
                                "night": 0.2, // % of daily = 0.2 x 334.09 = 66.818
                            }, // 167.045 + 33.409 + 66.818 + 66.818 = 334.09
                        }, // 334.09 X 22 = 7350
                        "saturdays": {
                            "days": 4, // no. of days
                            "monthly": 0.2, // % of weight = 10500 x 0.2 = 2100
                            "daily": 0.05, // % of weight = 0.2 / 4 = 0.05 && 2100 / 4 = 525
                            "unique": 0.4, // % of daily % = 0.4 x 525 = 210
                            "cohort": {
                                "morning": 0.2, // % of daily = 0.2 x 525 = 105
                                "afternoon": 0.2, // % of daily = 0.2 x 525 = 105
                                "evening": 0.2, // % of daily = 0.2 x 525 = 105
                                "night": 0.4, // % of daily = 0.4 x 525 = 210
                            }, // 105 + 105 + 105 + 210 = 525
                        }, // 525 x 4 = 2100
                        "sundays": {
                            "days": 4, // no. of days
                            "monthly": 0.1, // % of weight = 10500 x 0.1 = 1050
                            "daily": 0.025, // % % of weight = 0.1 / 4 = 0.025 && 1050 / 4 = 262.5
                            "unique": 0.2, // % of daily % = 0.2 x 262.5 = 52.5
                            "cohort": {
                                "morning": 0.2, // % of daily = 0.2 x 262.5 = 52.5
                                "afternoon": 0.2, // % of daily = 0.2 x 262.5 = 52.5
                                "evening": 0.3, // % of daily = 0.3 x 262.5 = 78.75
                                "night": 0.3, // % of daily = 0.3 x 262.5 = 78.75
                            }, // 52.5 + 52.5 + 78.75 + 78.75 = 262.5
                        }, // 262.5 x 4 = 1050
                    }, // 7350 + 2100 + 1050 = 10500
                    {
                        "gender": "Female",
                        "weight": 0.3, // % of percentage = 0.3 x 15000 = 4500 = 4.5k monthly
                        "weekdays": {
                            "days": 22, // no. of days
                            "monthly": 0.6, // % of weight = 4500 x 0.6 = 2700
                            "daily": 0.027, // % of weight = 0.6 / 22 = 0.027 && 2700 / 22 = 122.72
                            "unique": 0.4, // % of daily % = 0.4 x 122.72 = 49.09
                            "cohort": {
                                "morning": 0.3, // % of daily = 0.3 x 122.72 = 36.81
                                "afternoon": 0.2, // % of daily = 0.2 x 122.72 = 24.54
                                "evening": 0.3, // % of daily = 0.3 x 122.72 = 36.81
                                "night": 0.2, // % of daily = 0.2 x 122.72 = 24.54
                            }, // 36.81 + 24.54 + 36.81 + 24.54 = 122.72
                        }, // 122.72 x 22 = 2700
                        "saturdays": {
                            "days": 4, // no. of days
                            "monthly": 0.3, // % of weight = 4500 x 0.3 = 1350
                            "daily": 0.075, // % of weight = 0.3 / 4 = 0.075 && 1350 / 4 = 337.5
                            "unique": 0.4, // % of daily % = 0.4 x 337.5 = 135
                            "cohort": {
                                "morning": 0.2, // % of daily = 0.2 x 337.5 = 67.5
                                "afternoon": 0.1, // % of daily = 0.1 x 337.5 = 33.75
                                "evening": 0.3, // % of daily = 0.3 x 337.5 = 101
                                "night": 0.4, // % of daily = 0.4 x 337.5 = 135
                            }, // 67.5 + 33.75 + 101 + 135 = 337.5
                        }, // 337.5 x 4 = 1350
                        "sundays": {
                            "days": 4, // no. of days
                            "monthly": 0.1, // % of weight = 4500 x 0.1 = 450
                            "daily": 0.025, // % % of weight = 0.1 / 4 = 0.025 && 450 / 4 = 112.5
                            "unique": 0.2, // % of daily % = 0.2 x 112.5 = 22.5
                            "cohort": {
                                "morning": 0.2, // % of daily = 0.2 x 112.5 = 22.5
                                "afternoon": 0.1, // % of daily = 0.1 x 112.5 = 11.25
                                "evening": 0.4, // % of daily = 0.4 x 112.5 = 45
                                "night": 0.3, // % of daily = 0.3 x 112.5 = 33.75
                            }, // 22.5 + 11.25 + 45 + 33.75 = 112.5
                        }, // 112.5 x 4 = 450
                    }, // 2700 + 1350 + 450 = 4500
                ], // 10500 + 4500 = 15000
                "impact_factor": {
                    "govt_holidays": 0.11, // % increase or decrease
                    "long_weekends_holidays": 0.7, // % increase or decrease
                    "festivals": 0.8, // % increase or decrease
                    "peak_winters": 0.6, // % increase or decrease
                    "peak_summers": 0.8, // % increase or decrease
                    "summer_holidays_school": 0.6, // % increase or decrease
                }
            },
            {
                "type": "Working Professionals-B",
                "percentage": 0.15, // % of total audience = 15000 = 15k monthly
                "gene": [
   
                ],
                "impact_factor": {
                    "weekdays": {
                        "govt_holidays": 22, // % increase or decrease
                        "long_weekends_holidays": 0, // % increase or decrease
                        "festivals": 0, // % increase or decrease
                        "peak_winters": 0, // % increase or decrease
                        "peak_summers": 0, // % increase or decrease
                        "summer_holidays_school": 0, // % increase or decrease
                    },
                    "saturdays": {
                       "govt_holidays": 22, // % increase or decrease
                        "long_weekends_holidays": 0, // % increase or decrease
                        "festivals": 0, // % increase or decrease
                        "peak_winters": 0, // % increase or decrease
                        "peak_summers": 0, // % increase or decrease
                        "summer_holidays_school": 0, // % increase or decrease
                    },
                    "sundays": {
                        "govt_holidays": 22, // % increase or decrease
                        "long_weekends_holidays": 0, // % increase or decrease
                        "festivals": 0, // % increase or decrease
                        "peak_winters": 0, // % increase or decrease
                        "peak_summers": 0, // % increase or decrease
                        "summer_holidays_school": 0, // % increase or decrease
                    }
                }
            },
            {
                "type": "Entrepreneurs",
                "percentage": 0.1, // % of total audience = 10000 = 10k monthly
                "gene": [
           
                ],
                "impact_factor": {
                    "weekdays": {
                        "govt_holidays": 22, // % increase or decrease
                        "long_weekends_holidays": 0, // % increase or decrease
                        "festivals": 0, // % increase or decrease
                        "peak_winters": 0, // % increase or decrease
                        "peak_summers": 0, // % increase or decrease
                        "summer_holidays_school": 0, // % increase or decrease
                    },
                    "saturdays": {
                       "govt_holidays": 22, // % increase or decrease
                        "long_weekends_holidays": 0, // % increase or decrease
                        "festivals": 0, // % increase or decrease
                        "peak_winters": 0, // % increase or decrease
                        "peak_summers": 0, // % increase or decrease
                        "summer_holidays_school": 0, // % increase or decrease
                    },
                    "sundays": {
                        "govt_holidays": 22, // % increase or decrease
                        "long_weekends_holidays": 0, // % increase or decrease
                        "festivals": 0, // % increase or decrease
                        "peak_winters": 0, // % increase or decrease
                        "peak_summers": 0, // % increase or decrease
                        "summer_holidays_school": 0, // % increase or decrease
                    }
                }
            },
            {
                "type": "HNI (18 yrs - 60 yrs)",
                "percentage": 0.05, // % of total audience = 5000 = 5k monthly
                "gene": [
      
                ],
                "impact_factor": {
                    "weekdays": {
                        "govt_holidays": 22, // % increase or decrease
                        "long_weekends_holidays": 0, // % increase or decrease
                        "festivals": 0, // % increase or decrease
                        "peak_winters": 0, // % increase or decrease
                        "peak_summers": 0, // % increase or decrease
                        "summer_holidays_school": 0, // % increase or decrease
                    },
                    "saturdays": {
                       "govt_holidays": 22, // % increase or decrease
                        "long_weekends_holidays": 0, // % increase or decrease
                        "festivals": 0, // % increase or decrease
                        "peak_winters": 0, // % increase or decrease
                        "peak_summers": 0, // % increase or decrease
                        "summer_holidays_school": 0, // % increase or decrease
                    },
                    "sundays": {
                        "govt_holidays": 22, // % increase or decrease
                        "long_weekends_holidays": 0, // % increase or decrease
                        "festivals": 0, // % increase or decrease
                        "peak_winters": 0, // % increase or decrease
                        "peak_summers": 0, // % increase or decrease
                        "summer_holidays_school": 0, // % increase or decrease
                    }
                }
            },
            {
                "type": "Gen-Zs",
                "percentage": 0.1, // % of total audience = 15000 = 10k monthly
                "gene": [
      
                ],
                "impact_factor": {
                    "weekdays": {
                        "govt_holidays": 22, // % increase or decrease
                        "long_weekends_holidays": 0, // % increase or decrease
                        "festivals": 0, // % increase or decrease
                        "peak_winters": 0, // % increase or decrease
                        "peak_summers": 0, // % increase or decrease
                        "summer_holidays_school": 0, // % increase or decrease
                    },
                    "saturdays": {
                       "govt_holidays": 22, // % increase or decrease
                        "long_weekends_holidays": 0, // % increase or decrease
                        "festivals": 0, // % increase or decrease
                        "peak_winters": 0, // % increase or decrease
                        "peak_summers": 0, // % increase or decrease
                        "summer_holidays_school": 0, // % increase or decrease
                    },
                    "sundays": {
                        "govt_holidays": 22, // % increase or decrease
                        "long_weekends_holidays": 0, // % increase or decrease
                        "festivals": 0, // % increase or decrease
                        "peak_winters": 0, // % increase or decrease
                        "peak_summers": 0, // % increase or decrease
                        "summer_holidays_school": 0, // % increase or decrease
                    }
                }
            },
            {
                "type": "Gig Workers",
                "percentage": 0.1, // % of total audience = 15000 = 10k monthly
                "gene": [
     
                ],
                "impact_factor": {
                    "weekdays": {
                        "govt_holidays": 22, // % increase or decrease
                        "long_weekends_holidays": 0, // % increase or decrease
                        "festivals": 0, // % increase or decrease
                        "peak_winters": 0, // % increase or decrease
                        "peak_summers": 0, // % increase or decrease
                        "summer_holidays_school": 0, // % increase or decrease
                    },
                    "saturdays": {
                       "govt_holidays": 22, // % increase or decrease
                        "long_weekends_holidays": 0, // % increase or decrease
                        "festivals": 0, // % increase or decrease
                        "peak_winters": 0, // % increase or decrease
                        "peak_summers": 0, // % increase or decrease
                        "summer_holidays_school": 0, // % increase or decrease
                    },
                    "sundays": {
                        "govt_holidays": 22, // % increase or decrease
                        "long_weekends_holidays": 0, // % increase or decrease
                        "festivals": 0, // % increase or decrease
                        "peak_winters": 0, // % increase or decrease
                        "peak_summers": 0, // % increase or decrease
                        "summer_holidays_school": 0, // % increase or decrease
                    }
                }
            },
            {
                "type": "College Students (25 yrs - 50 yrs)",
                "percentage": 0.05, // % of total audience = 15000 = 5k monthly
                "gene": [
       
                ],
                "impact_factor": {
                    "weekdays": {
                        "govt_holidays": 22, // % increase or decrease
                        "long_weekends_holidays": 0, // % increase or decrease
                        "festivals": 0, // % increase or decrease
                        "peak_winters": 0, // % increase or decrease
                        "peak_summers": 0, // % increase or decrease
                        "summer_holidays_school": 0, // % increase or decrease
                    },
                    "saturdays": {
                       "govt_holidays": 22, // % increase or decrease
                        "long_weekends_holidays": 0, // % increase or decrease
                        "festivals": 0, // % increase or decrease
                        "peak_winters": 0, // % increase or decrease
                        "peak_summers": 0, // % increase or decrease
                        "summer_holidays_school": 0, // % increase or decrease
                    },
                    "sundays": {
                        "govt_holidays": 22, // % increase or decrease
                        "long_weekends_holidays": 0, // % increase or decrease
                        "festivals": 0, // % increase or decrease
                        "peak_winters": 0, // % increase or decrease
                        "peak_summers": 0, // % increase or decrease
                        "summer_holidays_school": 0, // % increase or decrease
                    }
                }
            },
            {
                "type": "Young Adults ( 18 yrs - 25 yrs)",
                "percentage": 0.1, // % of total audience = 15000 = 10k monthly
                "gene": [
      
                ],
                "impact_factor": {
                    "weekdays": {
                        "govt_holidays": 22, // % increase or decrease
                        "long_weekends_holidays": 0, // % increase or decrease
                        "festivals": 0, // % increase or decrease
                        "peak_winters": 0, // % increase or decrease
                        "peak_summers": 0, // % increase or decrease
                        "summer_holidays_school": 0, // % increase or decrease
                    },
                    "saturdays": {
                       "govt_holidays": 22, // % increase or decrease
                        "long_weekends_holidays": 0, // % increase or decrease
                        "festivals": 0, // % increase or decrease
                        "peak_winters": 0, // % increase or decrease
                        "peak_summers": 0, // % increase or decrease
                        "summer_holidays_school": 0, // % increase or decrease
                    },
                    "sundays": {
                        "govt_holidays": 22, // % increase or decrease
                        "long_weekends_holidays": 0, // % increase or decrease
                        "festivals": 0, // % increase or decrease
                        "peak_winters": 0, // % increase or decrease
                        "peak_summers": 0, // % increase or decrease
                        "summer_holidays_school": 0, // % increase or decrease
                    }
                }
            },
            {
                "type": "Diners",
                "percentage": 0.1, // % of total audience = 15000 = 10k monthly
                "gene": [
     
                ],
                "impact_factor": {
                    "weekdays": {
                        "govt_holidays": 22, // % increase or decrease
                        "long_weekends_holidays": 0, // % increase or decrease
                        "festivals": 0, // % increase or decrease
                        "peak_winters": 0, // % increase or decrease
                        "peak_summers": 0, // % increase or decrease
                        "summer_holidays_school": 0, // % increase or decrease
                    },
                    "saturdays": {
                       "govt_holidays": 22, // % increase or decrease
                        "long_weekends_holidays": 0, // % increase or decrease
                        "festivals": 0, // % increase or decrease
                        "peak_winters": 0, // % increase or decrease
                        "peak_summers": 0, // % increase or decrease
                        "summer_holidays_school": 0, // % increase or decrease
                    },
                    "sundays": {
                        "govt_holidays": 22, // % increase or decrease
                        "long_weekends_holidays": 0, // % increase or decrease
                        "festivals": 0, // % increase or decrease
                        "peak_winters": 0, // % increase or decrease
                        "peak_summers": 0, // % increase or decrease
                        "summer_holidays_school": 0, // % increase or decrease
                    }
                }
            },
            {
                "type": "Affluent Shoppers",
                "percentage": 0.1, // % of total audience = 15000 = 10k monthly
                "gene": [
       
                ],
                "impact_factor": {
                    "weekdays": {
                        "govt_holidays": 22, // % increase or decrease
                        "long_weekends_holidays": 0, // % increase or decrease
                        "festivals": 0, // % increase or decrease
                        "peak_winters": 0, // % increase or decrease
                        "peak_summers": 0, // % increase or decrease
                        "summer_holidays_school": 0, // % increase or decrease
                    },
                    "saturdays": {
                       "govt_holidays": 22, // % increase or decrease
                        "long_weekends_holidays": 0, // % increase or decrease
                        "festivals": 0, // % increase or decrease
                        "peak_winters": 0, // % increase or decrease
                        "peak_summers": 0, // % increase or decrease
                        "summer_holidays_school": 0, // % increase or decrease
                    },
                    "sundays": {
                        "govt_holidays": 22, // % increase or decrease
                        "long_weekends_holidays": 0, // % increase or decrease
                        "festivals": 0, // % increase or decrease
                        "peak_winters": 0, // % increase or decrease
                        "peak_summers": 0, // % increase or decrease
                        "summer_holidays_school": 0, // % increase or decrease
                    }
                }
            },
        ], // 15000 + 15000 + 10000 + 5000 + 10000 + 10000 + 5000 + 10000 + 10000 + 10000 = 100000 = 100k
        
    }
}]