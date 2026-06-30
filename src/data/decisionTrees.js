// TDR Decision Trees — one per issue category
// Leaf nodes: { eligible, reason, deadline, recommendation }
// Branch nodes: { id, question, yes, no }

export const ISSUE_CATEGORIES = [
  { key: "delayed", label: "Train Delayed", sub: "Train arrived or departed very late" },
  { key: "ac", label: "AC Failure", sub: "Air conditioning stopped working" },
  { key: "diverted", label: "Train Diverted / Terminated", sub: "Route changed or train stopped early" },
  { key: "not_travelled", label: "Passenger Not Travelled", sub: "Did not board the train at all" },
  { key: "fare_diff", label: "Difference of Fare / Lower Class", sub: "Travelled in a lower class than booked" },
  { key: "coach_damage", label: "Coach Damage", sub: "Coach was damaged or declared unsafe" },
  { key: "missed_connection", label: "Missed Connecting Train", sub: "Missed connection due to late first train" },
  { key: "rac_not_travelled", label: "RAC Ticket — Not Travelled", sub: "RAC ticket, did not travel after chart preparation" },
];

export const DECISION_TREES = {
  delayed: {
    id: "q1",
    question: "Was the train delayed by more than 3 hours?",
    yes: {
      id: "q2",
      question: "Did you choose to NOT travel because of this delay?",
      yes: {
        eligible: true,
        issueId: "TRAIN_DELAY",//1
        reason: "Train late more than three hours and passenger not travelled",
        deadline: "Up to the actual departure time of the train at the boarding station",
        recommendation:
          "File TDR immediately — before the train actually departs your boarding station. Once the train leaves, you lose eligibility.",
      },
      no: {
        eligible: false,
        reason: null,
        deadline: null,
        recommendation:
          "TDR cannot be filed if you travelled on a delayed train. Refund under this reason is only applicable if you did not travel.",
      },
    },
    no: {
      eligible: false,
      reason: null,
      deadline: null,
      recommendation:
        "The delay must exceed 3 hours to qualify for TDR under this category. No refund is applicable for shorter delays.",
    },
  },

  ac: {
    id: "q1",
    question: "Did the AC in your coach fail during the journey?",
    yes: {
      id: "q2",
      question: "Did you get the Gaurd Certificate(GC) or Excess Fare Ticket(EFT) issued by TTE(Travelling Ticket Examiner) ?",
      yes: {
        eligible: true,
        issueId: "AC_FAILURE",//2
        reason: "AC Failure",
        deadline: "Within 20 hours of actual arrival of the train at your destination station",
        recommendation:
          "File TDR within 20 hours of the train's actual arrival at your destination. Carry any proof of AC failure if available.",
      },
      no: {
        eligible: false,
        reason: null,
        deadline: null,
        recommendation:
          "TDR for AC failure applies only if you travelled on the ticket. If you did not travel due to AC failure, file under 'Passenger Not Travelled' instead.",
      },
    },
    no: {
      eligible: false,
      reason: null,
      deadline: null,
      recommendation:
        "AC failure must have occurred during the journey for this TDR reason to apply. No refund is available under this category.",
    },
  },

  diverted: {
    id: "q1",
    question: "Did the train get terminated before reaching your destination station?",
    yes: {
      eligible: true,
      issueId: "TRAIN_TERMINATED_SHORT",//3
      reason: "Train Terminated Short of Destination",
      deadline: "Up to 72 hours from the scheduled arrival at your destination",
      recommendation:
        "File TDR within 72 hours of the train's scheduled arrival time at your destination station.",
    },
    no: {
      id: "q2",
      question: "Was the train diverted to a completely different route?",
      yes: {
        id: "q3",
        question: "Did the diverted route skip your boarding station entirely (train did not stop there)?",
        yes: {
          eligible: true,
          issueId: "DIVERTED_BOARDING",//4
          reason: "Train Diverted and Train not touching Boarding Station",
          deadline: "Up to 72 hours from scheduled departure",
          recommendation:
            "Since the train did not stop at your boarding station, file TDR within 72 hours of the scheduled departure time.",
        },
        no: {
          id: "q4",
          question: "Did the diverted route skip your destination station (train did not stop there)?",
          yes: {
            eligible: true,
            issueId: "DIVERTED_DESTINATION",//5
            reason: "Train Diverted and Train not touching Destination Station",
            deadline: "Up to 72 hours from scheduled arrival at your destination",
            recommendation:
              "Since the train did not reach your destination, file TDR within 72 hours of the scheduled arrival time.",
          },
          no: {
            id: "q5",
            question: "Did you choose not to travel because of the diversion?",
            yes: {
              eligible: true,
              issueId: "DIVERTED_NOT_TRAVELLED",//6
              reason: "Train Diverted and Passenger Not Travelled",
              deadline: "Up to 72 hours from scheduled departure",
              recommendation:
                "File TDR within 72 hours of the scheduled departure time of your train.",
            },
            no: {
              eligible: false,
              reason: null,
              deadline: null,
              recommendation:
                "If you travelled on the diverted route and it still covered both your stations, TDR is not applicable under this category.",
            },
          },
        },
      },
      no: {
        eligible: false,
        reason: null,
        deadline: null,
        recommendation:
          "Neither diversion nor premature termination applies to your journey. TDR cannot be filed under this category.",
      },
    },
  },

  not_travelled: {
    id: "q1",
    question: "Did ALL passengers on your ticket choose not to travel?",
    yes: {
      id: "q2",
      question: "Was the entire booking fully confirmed (no waitlisted passengers)?",
      yes: {
        eligible: true,
        issueId: "ALL_CONFIRMED_NOT_TRAVELLED",//7
        reason: "All Confirmed Passenger Not Travelled",
        deadline: "Up to 4 hours before scheduled departure",
        recommendation:
          "File TDR at least 4 hours before the scheduled departure. Missing this window means no refund.",
      },
      no: {
        id: "q3",
        question: "Was your booking a mix of confirmed and waitlisted passengers, and did only the waitlisted passengers not travel?",
        yes: {
          eligible: true,
          issueId: "WAITLIST_NOT_TRAVELLED",//8
          reason: "Party Partially Confirm/Waitlist and Waitlisted Passengers Did Not Travel",
          deadline: "Up to 30 minutes before scheduled departure",
          recommendation:
            "File TDR at least 30 minutes before scheduled departure for the waitlisted passengers who did not travel.",
        },
        no: {
          eligible: true,
          issueId: "ALL_PASSENGERS_NOT_TRAVELLED",//9
          reason: "Party Partially Confirmed/Waitlisted and All Passengers Did Not Travel",
          deadline: "Up to 72 hours from scheduled departure",
          recommendation:
            "All passengers — both confirmed and waitlisted — did not travel. File TDR within 72 hours of scheduled departure.",
        },
      },
    },
    no: {
      id: "q4",
      question: "Did some passengers in your group travel while the rest did not?",
      yes: {
        eligible: true,
        issueId: "PARTIALLY_TRAVELLED",//10
        reason: "Party Partially Travelled (Refund on Partially Used Ticket)",
        deadline: "Up to 72 hours from actual arrival of the train at your destination",
        recommendation:
          "File TDR within 72 hours of the train's actual arrival at the destination for the passengers who did not travel.",
      },
      no: {
        eligible: false,
        reason: null,
        deadline: null,
        recommendation:
          "If all passengers completed their journey, TDR under 'Passenger Not Travelled' does not apply.",
      },
    },
  },

  fare_diff: {
    id: "q1",
    question: "Was your reserved coach not attached to the train at all?",
    yes: {
      eligible: true,
      issueId: "COACH_NOT_ATTACHED",//11
      reason: "Difference of Fare in case proper coach not attached",
      deadline: "Up to 2 days from the date of issue of the TTE certificate (excluding that day)",
      recommendation:
        "Obtain a certificate from the TTE on the train confirming the missing coach, then file TDR within 2 days of that certificate (the issue day is excluded).",
    },
    no: {
      id: "q2",
      question: "Did you travel in a lower class because your booked class was unavailable?",
      yes: {
        eligible: true,
        issueId: "LOWER_CLASS_TRAVELLED",//12
        reason: "Difference of Fare as passenger travelled in lower class",
        deadline: "Within 3 hours from actual departure time of the train",
        recommendation:
          "File TDR within 3 hours of the train's actual departure. Obtain a TTE certificate confirming you were made to travel in lower class.",
      },
      no: {
        id: "q3",
        question: "Did you refuse to travel because your reservation was issued in a lower class than booked?",
        yes: {
          eligible: true,
          issueId: "LOWER_CLASS_NOT_TRAVELLED",//13
          reason: "Passenger not travelled as reservation provided in lower class",
          deadline: "Within 3 hours from actual departure time of the train",
          recommendation:
            "File TDR within 3 hours of the train's actual departure, stating that the reservation was provided in a lower class.",
        },
        no: {
          eligible: false,
          reason: null,
          deadline: null,
          recommendation:
            "None of the fare difference scenarios apply to your situation. TDR cannot be filed under this category.",
        },
      },
    },
  },

  coach_damage: {
    id: "q1",
    question: "Was your assigned coach damaged or officially declared unsafe for travel?",
    yes: {
      id: "q2",
      question: "Did you choose not to travel because of the coach damage?",
      yes: {
        eligible: true,
        issueId: "COACH_DAMAGE",//14
        reason: "Passenger Not Travelled Due To Coach Damage",
        deadline: "Within 3 hours from actual departure time of the train",
        recommendation:
          "File TDR within 3 hours of the train's actual departure. Obtain a certificate from railway staff confirming the coach damage.",
      },
      no: {
        eligible: false,
        reason: null,
        deadline: null,
        recommendation:
          "If you travelled despite the coach damage, TDR under this category does not apply.",
      },
    },
    no: {
      eligible: false,
      reason: null,
      deadline: null,
      recommendation:
        "Coach damage must be officially confirmed by railway staff for this TDR reason to apply.",
    },
  },

  missed_connection: {
    id: "q1",
    question: "Did you miss your connecting train because your first train arrived late?",
    yes: {
      id: "q2",
      question: "Are both your PNRs linked together (booked as a connecting journey on IRCTC)?",
      yes: {
        eligible: true,
        issueId: "MISSED_CONNECTION",//15
        reason: "Missing the connecting train due to late running of first Train",
        deadline: "Within 3 hours of actual arrival of the first train at the connecting station",
        recommendation:
          "File TDR within 3 hours of the actual arrival of your first train at the connecting station. Both PNRs must be linked — verify this on your booking before filing.",
      },
      no: {
        eligible: false,
        reason: null,
        deadline: null,
        recommendation:
          "TDR for a missed connection is only valid if both PNRs are officially linked at the time of booking. Independently booked tickets do not qualify under this reason.",
      },
    },
    no: {
      eligible: false,
      reason: null,
      deadline: null,
      recommendation:
        "TDR under this category only applies when a late-running first train directly caused you to miss the connecting train.",
    },
  },

  rac_not_travelled: {
    id: "q1",
    question: "Is your ticket in RAC (Reservation Against Cancellation) status after chart preparation?",
    yes: {
      id: "q2",
      question: "Did you choose not to travel on this RAC ticket?",
      yes: {
        eligible: true,
        issueId: "RAC",//16
        reason: "Passenger Not Travelled Due To Ticket In RAC After Chart Preparation",
        deadline: "At least 30 minutes before scheduled departure of the train",
        recommendation:
          "You filed within the required window. Submit the TDR online via IRCTC. No refund is admissible if this deadline was missed.",


      },
      no: {
        eligible: false,
        reason: null,
        deadline: null,
        recommendation:
          "If you travelled on your RAC ticket, TDR under this category does not apply.",
      },
    },
    no: {
      eligible: false,
      reason: null,
      deadline: null,
      recommendation:
        "This category only applies to RAC-status tickets after chart preparation. Your ticket status does not qualify.",
    },
  },
};