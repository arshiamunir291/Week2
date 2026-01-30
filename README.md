This app Patient-Management-system , display a list of patient and on selection of a particular patient,patients's details shows
It has two sibling components:
1. Patient-list:It shows the list of patients.
2. Patient-detail:It shows the detail of selected patient.

Why not use input/output signal?
input ans output signals are used for communcation between parent and child component,in this case both component are sibling so there is no need of input/output signal.

Why use service?
A service is used to share data and communicate between componets without creating direct dependencies. In this application both components have to commuicate so service is the reliable way to communicate and managed shared data.