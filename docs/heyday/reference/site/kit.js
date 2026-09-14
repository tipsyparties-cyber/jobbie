/* Heyday mark motion: the sun and the shapes it turns into.
   Each shape is the same eight strokes and one core, 17 points per stroke, on a 100-unit square.
   A morph moves every point from one shape to the next and blends the colours. */
var HEYDAY_SHAPES = {"sun":{"r":[[[50.0,50.0],[52.5,50.0],[55.0,50.0],[57.5,50.0],[60.0,50.0],[62.5,50.0],[65.0,50.0],[67.5,50.0],[70.0,50.0],[72.5,50.0],[75.0,50.0],[77.5,50.0],[80.0,50.0],[82.5,50.0],[85.0,50.0],[87.5,50.0],[90.0,50.0]],[[50.0,50.0],[51.77,51.77],[53.54,53.54],[55.3,55.3],[57.07,57.07],[58.84,58.84],[60.61,60.61],[62.37,62.37],[64.14,64.14],[65.91,65.91],[67.68,67.68],[69.45,69.45],[71.21,71.21],[72.98,72.98],[74.75,74.75],[76.52,76.52],[78.28,78.28]],[[50.0,50.0],[50.0,52.5],[50.0,55.0],[50.0,57.5],[50.0,60.0],[50.0,62.5],[50.0,65.0],[50.0,67.5],[50.0,70.0],[50.0,72.5],[50.0,75.0],[50.0,77.5],[50.0,80.0],[50.0,82.5],[50.0,85.0],[50.0,87.5],[50.0,90.0]],[[50.0,50.0],[48.23,51.77],[46.46,53.54],[44.7,55.3],[42.93,57.07],[41.16,58.84],[39.39,60.61],[37.63,62.37],[35.86,64.14],[34.09,65.91],[32.32,67.68],[30.55,69.45],[28.79,71.21],[27.02,72.98],[25.25,74.75],[23.48,76.52],[21.72,78.28]],[[50.0,50.0],[47.5,50.0],[45.0,50.0],[42.5,50.0],[40.0,50.0],[37.5,50.0],[35.0,50.0],[32.5,50.0],[30.0,50.0],[27.5,50.0],[25.0,50.0],[22.5,50.0],[20.0,50.0],[17.5,50.0],[15.0,50.0],[12.5,50.0],[10.0,50.0]],[[50.0,50.0],[48.23,48.23],[46.46,46.46],[44.7,44.7],[42.93,42.93],[41.16,41.16],[39.39,39.39],[37.63,37.63],[35.86,35.86],[34.09,34.09],[32.32,32.32],[30.55,30.55],[28.79,28.79],[27.02,27.02],[25.25,25.25],[23.48,23.48],[21.72,21.72]],[[50.0,50.0],[50.0,47.5],[50.0,45.0],[50.0,42.5],[50.0,40.0],[50.0,37.5],[50.0,35.0],[50.0,32.5],[50.0,30.0],[50.0,27.5],[50.0,25.0],[50.0,22.5],[50.0,20.0],[50.0,17.5],[50.0,15.0],[50.0,12.5],[50.0,10.0]],[[50.0,50.0],[51.77,48.23],[53.54,46.46],[55.3,44.7],[57.07,42.93],[58.84,41.16],[60.61,39.39],[62.37,37.63],[64.14,35.86],[65.91,34.09],[67.68,32.32],[69.45,30.55],[71.21,28.79],[72.98,27.02],[74.75,25.25],[76.52,23.48],[78.28,21.72]]],"h":[1,1,1,1,1,1,1,1],"c":[50,50,10],"rc":"#93B7E8","cc":"#93B7E8"},"sunrise":{"r":[[[50.0,60.0],[52.41,59.35],[54.83,58.71],[57.24,58.06],[59.66,57.41],[62.07,56.76],[64.49,56.12],[66.9,55.47],[69.32,54.82],[71.73,54.18],[74.15,53.53],[76.56,52.88],[78.98,52.24],[81.39,51.59],[83.81,50.94],[86.22,50.29],[88.64,49.65]],[[50.0,60.0],[52.38,60.0],[54.75,60.0],[57.12,60.0],[59.5,60.0],[61.88,60.0],[64.25,60.0],[66.62,60.0],[69.0,60.0],[71.38,60.0],[73.75,60.0],[76.12,60.0],[78.5,60.0],[80.88,60.0],[83.25,60.0],[85.62,60.0],[88.0,60.0]],[[30.0,76.0],[32.5,76.0],[35.0,76.0],[37.5,76.0],[40.0,76.0],[42.5,76.0],[45.0,76.0],[47.5,76.0],[50.0,76.0],[52.5,76.0],[55.0,76.0],[57.5,76.0],[60.0,76.0],[62.5,76.0],[65.0,76.0],[67.5,76.0],[70.0,76.0]],[[50.0,60.0],[47.62,60.0],[45.25,60.0],[42.88,60.0],[40.5,60.0],[38.12,60.0],[35.75,60.0],[33.38,60.0],[31.0,60.0],[28.62,60.0],[26.25,60.0],[23.88,60.0],[21.5,60.0],[19.12,60.0],[16.75,60.0],[14.38,60.0],[12.0,60.0]],[[50.0,60.0],[47.59,59.35],[45.17,58.71],[42.76,58.06],[40.34,57.41],[37.93,56.76],[35.51,56.12],[33.1,55.47],[30.68,54.82],[28.27,54.18],[25.85,53.53],[23.44,52.88],[21.02,52.24],[18.61,51.59],[16.19,50.94],[13.78,50.29],[11.36,49.65]],[[50.0,60.0],[48.48,58.02],[46.96,56.03],[45.43,54.05],[43.91,52.07],[42.39,50.08],[40.87,48.1],[39.35,46.12],[37.82,44.13],[36.3,42.15],[34.78,40.17],[33.26,38.18],[31.74,36.2],[30.22,34.22],[28.69,32.23],[27.17,30.25],[25.65,28.27]],[[50.0,60.0],[50.0,57.5],[50.0,55.0],[50.0,52.5],[50.0,50.0],[50.0,47.5],[50.0,45.0],[50.0,42.5],[50.0,40.0],[50.0,37.5],[50.0,35.0],[50.0,32.5],[50.0,30.0],[50.0,27.5],[50.0,25.0],[50.0,22.5],[50.0,20.0]],[[50.0,60.0],[51.52,58.02],[53.04,56.03],[54.57,54.05],[56.09,52.07],[57.61,50.08],[59.13,48.1],[60.65,46.12],[62.18,44.13],[63.7,42.15],[65.22,40.17],[66.74,38.18],[68.26,36.2],[69.78,34.22],[71.31,32.23],[72.83,30.25],[74.35,28.27]]],"h":[1,0,0,0,1,1,1,1],"c":[50,60,10],"rc":"#F26B2A","cc":"#F26B2A"},"signal":{"r":[[[50.0,50.0],[52.5,50.0],[55.0,50.0],[57.5,50.0],[60.0,50.0],[62.5,50.0],[65.0,50.0],[67.5,50.0],[70.0,50.0],[72.5,50.0],[75.0,50.0],[77.5,50.0],[80.0,50.0],[82.5,50.0],[85.0,50.0],[87.5,50.0],[90.0,50.0]],[[50.0,50.0],[51.77,51.77],[53.54,53.54],[55.3,55.3],[57.07,57.07],[58.84,58.84],[60.61,60.61],[62.37,62.37],[64.14,64.14],[65.91,65.91],[67.68,67.68],[69.45,69.45],[71.21,71.21],[72.98,72.98],[74.75,74.75],[76.52,76.52],[78.28,78.28]],[[50,50],[50,50],[50,50],[50,50],[50,50],[50,50],[50,50],[50,50],[50,50],[50,50],[50,50],[50,50],[50,50],[50,50],[50,50],[50,50],[50,50]],[[43.16,68.79],[40.38,67.53],[37.82,65.87],[35.55,63.83],[33.62,61.47],[32.06,58.85],[30.93,56.01],[30.23,53.04],[30.0,50.0],[30.23,46.96],[30.93,43.99],[32.06,41.15],[33.62,38.53],[35.55,36.17],[37.82,34.13],[40.38,32.47],[43.16,31.21]],[[39.74,78.19],[35.57,76.3],[31.74,73.8],[28.33,70.75],[25.43,67.21],[23.09,63.27],[21.39,59.02],[20.35,54.56],[20.0,50.0],[20.35,45.44],[21.39,40.98],[23.09,36.73],[25.43,32.79],[28.33,29.25],[31.74,26.2],[35.57,23.7],[39.74,21.81]],[[36.32,12.41],[30.76,14.93],[25.65,18.27],[21.11,22.34],[17.23,27.06],[14.13,32.31],[11.85,37.97],[10.47,43.92],[10.0,50.0],[10.47,56.08],[11.85,62.03],[14.13,67.69],[17.23,72.94],[21.11,77.66],[25.65,81.73],[30.76,85.07],[36.32,87.59]],[[50,50],[50,50],[50,50],[50,50],[50,50],[50,50],[50,50],[50,50],[50,50],[50,50],[50,50],[50,50],[50,50],[50,50],[50,50],[50,50],[50,50]],[[50.0,50.0],[51.77,48.23],[53.54,46.46],[55.3,44.7],[57.07,42.93],[58.84,41.16],[60.61,39.39],[62.37,37.63],[64.14,35.86],[65.91,34.09],[67.68,32.32],[69.45,30.55],[71.21,28.79],[72.98,27.02],[74.75,25.25],[76.52,23.48],[78.28,21.72]]],"h":[1,1,0,0,0,0,0,1],"c":[50,50,9],"rc":"#D6D0F5","cc":"#D6D0F5"},"connect":{"r":[[[68.0,50.0],[69.62,50.0],[71.25,50.0],[72.88,50.0],[74.5,50.0],[76.12,50.0],[77.75,50.0],[79.38,50.0],[81.0,50.0],[82.62,50.0],[84.25,50.0],[85.88,50.0],[87.5,50.0],[89.12,50.0],[90.75,50.0],[92.38,50.0],[94.0,50.0]],[[68.0,50.0],[68.93,51.33],[69.86,52.66],[70.8,53.99],[71.73,55.32],[72.66,56.66],[73.59,57.99],[74.52,59.32],[75.46,60.65],[76.39,61.98],[77.32,63.31],[78.25,64.64],[79.18,65.97],[80.12,67.3],[81.05,68.64],[81.98,69.97],[82.91,71.3]],[[50.0,50.0],[51.12,50.0],[52.25,50.0],[53.38,50.0],[54.5,50.0],[55.62,50.0],[56.75,50.0],[57.88,50.0],[59.0,50.0],[60.12,50.0],[61.25,50.0],[62.38,50.0],[63.5,50.0],[64.62,50.0],[65.75,50.0],[66.88,50.0],[68.0,50.0]],[[32.0,50.0],[31.07,51.33],[30.14,52.66],[29.2,53.99],[28.27,55.32],[27.34,56.66],[26.41,57.99],[25.48,59.32],[24.54,60.65],[23.61,61.98],[22.68,63.31],[21.75,64.64],[20.82,65.97],[19.88,67.3],[18.95,68.64],[18.02,69.97],[17.09,71.3]],[[32.0,50.0],[30.38,50.0],[28.75,50.0],[27.12,50.0],[25.5,50.0],[23.88,50.0],[22.25,50.0],[20.62,50.0],[19.0,50.0],[17.38,50.0],[15.75,50.0],[14.12,50.0],[12.5,50.0],[10.88,50.0],[9.25,50.0],[7.62,50.0],[6.0,50.0]],[[32.0,50.0],[31.07,48.67],[30.14,47.34],[29.2,46.01],[28.27,44.68],[27.34,43.34],[26.41,42.01],[25.48,40.68],[24.54,39.35],[23.61,38.02],[22.68,36.69],[21.75,35.36],[20.82,34.03],[19.88,32.7],[18.95,31.36],[18.02,30.03],[17.09,28.7]],[[50.0,50.0],[48.88,50.0],[47.75,50.0],[46.62,50.0],[45.5,50.0],[44.38,50.0],[43.25,50.0],[42.12,50.0],[41.0,50.0],[39.88,50.0],[38.75,50.0],[37.62,50.0],[36.5,50.0],[35.38,50.0],[34.25,50.0],[33.12,50.0],[32.0,50.0]],[[68.0,50.0],[68.93,48.67],[69.86,47.34],[70.8,46.01],[71.73,44.68],[72.66,43.34],[73.59,42.01],[74.52,40.68],[75.46,39.35],[76.39,38.02],[77.32,36.69],[78.25,35.36],[79.18,34.03],[80.12,32.7],[81.05,31.36],[81.98,30.03],[82.91,28.7]]],"h":[0.85,0.85,0,0.85,0.85,0.85,0,0.85],"c":[50,50,8],"rc":"#93B7E8","cc":"#93B7E8"},"dial":{"r":[[[77.71,66.0],[78.15,66.25],[78.58,66.5],[79.01,66.75],[79.44,67.0],[79.88,67.25],[80.31,67.5],[80.74,67.75],[81.18,68.0],[81.61,68.25],[82.04,68.5],[82.48,68.75],[82.91,69.0],[83.34,69.25],[83.77,69.5],[84.21,69.75],[84.64,70.0]],[[50.0,50.0],[51.41,49.19],[52.81,48.38],[54.22,47.56],[55.63,46.75],[57.04,45.94],[58.44,45.12],[59.85,44.31],[61.26,43.5],[62.67,42.69],[64.07,41.87],[65.48,41.06],[66.89,40.25],[68.29,39.44],[69.7,38.62],[71.11,37.81],[72.52,37.0]],[[50.0,82.0],[50.0,82.5],[50.0,83.0],[50.0,83.5],[50.0,84.0],[50.0,84.5],[50.0,85.0],[50.0,85.5],[50.0,86.0],[50.0,86.5],[50.0,87.0],[50.0,87.5],[50.0,88.0],[50.0,88.5],[50.0,89.0],[50.0,89.5],[50.0,90.0]],[[22.29,66.0],[21.85,66.25],[21.42,66.5],[20.99,66.75],[20.56,67.0],[20.12,67.25],[19.69,67.5],[19.26,67.75],[18.82,68.0],[18.39,68.25],[17.96,68.5],[17.52,68.75],[17.09,69.0],[16.66,69.25],[16.23,69.5],[15.79,69.75],[15.36,70.0]],[[22.29,34.0],[21.85,33.75],[21.42,33.5],[20.99,33.25],[20.56,33.0],[20.12,32.75],[19.69,32.5],[19.26,32.25],[18.82,32.0],[18.39,31.75],[17.96,31.5],[17.52,31.25],[17.09,31.0],[16.66,30.75],[16.23,30.5],[15.79,30.25],[15.36,30.0]],[[50.0,50.0],[48.97,49.41],[47.94,48.81],[46.91,48.22],[45.89,47.62],[44.86,47.03],[43.83,46.44],[42.8,45.84],[41.77,45.25],[40.74,44.66],[39.72,44.06],[38.69,43.47],[37.66,42.88],[36.63,42.28],[35.6,41.69],[34.57,41.09],[33.55,40.5]],[[50.0,18.0],[50.0,17.5],[50.0,17.0],[50.0,16.5],[50.0,16.0],[50.0,15.5],[50.0,15.0],[50.0,14.5],[50.0,14.0],[50.0,13.5],[50.0,13.0],[50.0,12.5],[50.0,12.0],[50.0,11.5],[50.0,11.0],[50.0,10.5],[50.0,10.0]],[[77.71,34.0],[78.15,33.75],[78.58,33.5],[79.01,33.25],[79.44,33.0],[79.88,32.75],[80.31,32.5],[80.74,32.25],[81.18,32.0],[81.61,31.75],[82.04,31.5],[82.48,31.25],[82.91,31.0],[83.34,30.75],[83.77,30.5],[84.21,30.25],[84.64,30.0]]],"h":[0,0.75,0,0,0,0.75,0,0],"c":[50,50,6],"rc":"#141210","cc":"#141210"},"paid":{"r":[[[89.78,45.82],[89.93,47.65],[90.0,49.48],[89.98,51.31],[89.88,53.14],[89.69,54.96],[89.42,56.77],[89.07,58.57],[88.64,60.35],[88.12,62.11],[87.53,63.84],[86.85,65.55],[86.1,67.22],[85.28,68.86],[84.38,70.45],[83.4,72.0],[82.36,73.51]],[[73.51,82.36],[72.0,83.4],[70.45,84.38],[68.86,85.28],[67.22,86.1],[65.55,86.85],[63.84,87.53],[62.11,88.12],[60.35,88.64],[58.57,89.07],[56.77,89.42],[54.96,89.69],[53.14,89.88],[51.31,89.98],[49.48,90.0],[47.65,89.93],[45.82,89.78]],[[33.73,86.54],[32.07,85.76],[30.46,84.9],[28.88,83.97],[27.34,82.97],[25.86,81.89],[24.42,80.75],[23.04,79.55],[21.72,78.28],[20.45,76.96],[19.25,75.58],[18.11,74.14],[17.03,72.66],[16.03,71.12],[15.1,69.54],[14.24,67.93],[13.46,66.27]],[[10.22,54.18],[10.07,52.35],[10.0,50.52],[10.02,48.69],[10.12,46.86],[10.31,45.04],[10.58,43.23],[10.93,41.43],[11.36,39.65],[11.88,37.89],[12.47,36.16],[13.15,34.45],[13.9,32.78],[14.72,31.14],[15.62,29.55],[16.6,28.0],[17.64,26.49]],[[26.49,17.64],[28.0,16.6],[29.55,15.62],[31.14,14.72],[32.78,13.9],[34.45,13.15],[36.16,12.47],[37.89,11.88],[39.65,11.36],[41.43,10.93],[43.23,10.58],[45.04,10.31],[46.86,10.12],[48.69,10.02],[50.52,10.0],[52.35,10.07],[54.18,10.22]],[[33.0,51.0],[33.75,51.75],[34.5,52.5],[35.25,53.25],[36.0,54.0],[36.75,54.75],[37.5,55.5],[38.25,56.25],[39.0,57.0],[39.75,57.75],[40.5,58.5],[41.25,59.25],[42.0,60.0],[42.75,60.75],[43.5,61.5],[44.25,62.25],[45.0,63.0]],[[45.0,63.0],[46.44,61.44],[47.88,59.88],[49.31,58.31],[50.75,56.75],[52.19,55.19],[53.62,53.62],[55.06,52.06],[56.5,50.5],[57.94,48.94],[59.38,47.38],[60.81,45.81],[62.25,44.25],[63.69,42.69],[65.12,41.12],[66.56,39.56],[68.0,38.0]],[[66.27,13.46],[67.93,14.24],[69.54,15.1],[71.12,16.03],[72.66,17.03],[74.14,18.11],[75.58,19.25],[76.96,20.45],[78.28,21.72],[79.55,23.04],[80.75,24.42],[81.89,25.86],[82.97,27.34],[83.97,28.88],[84.9,30.46],[85.76,32.07],[86.54,33.73]]],"h":[0,0,0,0,0,0,0,0],"c":[50,50,0],"rc":"#9AAD92","cc":"#9AAD92"},"loop":{"r":[[[82.84,41.2],[83.13,42.35],[83.38,43.51],[83.58,44.68],[83.75,45.86],[83.87,47.04],[83.95,48.22],[83.99,49.41],[83.99,50.59],[83.95,51.78],[83.87,52.96],[83.75,54.14],[83.58,55.32],[83.38,56.49],[83.13,57.65],[82.84,58.8],[82.51,59.94]],[[79.44,67.0],[78.83,68.02],[78.19,69.01],[77.51,69.98],[76.79,70.93],[76.05,71.85],[75.27,72.75],[74.46,73.62],[73.62,74.46],[72.75,75.27],[71.85,76.05],[70.93,76.79],[69.98,77.51],[69.01,78.19],[68.02,78.83],[67.0,79.44],[65.96,80.02]],[[58.8,82.84],[57.65,83.13],[56.49,83.38],[55.32,83.58],[54.14,83.75],[52.96,83.87],[51.78,83.95],[50.59,83.99],[49.41,83.99],[48.22,83.95],[47.04,83.87],[45.86,83.75],[44.68,83.58],[43.51,83.38],[42.35,83.13],[41.2,82.84],[40.06,82.51]],[[33.0,79.44],[31.98,78.83],[30.99,78.19],[30.02,77.51],[29.07,76.79],[28.15,76.05],[27.25,75.27],[26.38,74.46],[25.54,73.62],[24.73,72.75],[23.95,71.85],[23.21,70.93],[22.49,69.98],[21.81,69.01],[21.17,68.02],[20.56,67.0],[19.98,65.96]],[[17.16,58.8],[16.87,57.65],[16.62,56.49],[16.42,55.32],[16.25,54.14],[16.13,52.96],[16.05,51.78],[16.01,50.59],[16.01,49.41],[16.05,48.22],[16.13,47.04],[16.25,45.86],[16.42,44.68],[16.62,43.51],[16.87,42.35],[17.16,41.2],[17.49,40.06]],[[20.56,33.0],[21.17,31.98],[21.81,30.99],[22.49,30.02],[23.21,29.07],[23.95,28.15],[24.73,27.25],[25.54,26.38],[26.38,25.54],[27.25,24.73],[28.15,23.95],[29.07,23.21],[30.02,22.49],[30.99,21.81],[31.98,21.17],[33.0,20.56],[34.04,19.98]],[[41.2,17.16],[42.35,16.87],[43.51,16.62],[44.68,16.42],[45.86,16.25],[47.04,16.13],[48.22,16.05],[49.41,16.01],[50.59,16.01],[51.78,16.05],[52.96,16.13],[54.14,16.25],[55.32,16.42],[56.49,16.62],[57.65,16.87],[58.8,17.16],[59.94,17.49]],[[67.0,20.56],[68.02,21.17],[69.01,21.81],[69.98,22.49],[70.93,23.21],[71.85,23.95],[72.75,24.73],[73.62,25.54],[74.46,26.38],[75.27,27.25],[76.05,28.15],[76.79,29.07],[77.51,30.02],[78.19,30.99],[78.83,31.98],[79.44,33.0],[80.02,34.04]]],"h":[1,1,1,1,1,1,1,1],"c":[50,50,10],"rc":"#AEC9EE","cc":"#AEC9EE","spin":1},"inf":{"r":[[[94.0,50.0],[93.87,52.88],[93.5,55.7],[92.89,58.42],[92.05,60.98],[91.02,63.35],[89.81,65.5],[88.46,67.39],[86.98,69.02],[85.42,70.38],[83.79,71.47],[82.12,72.3],[80.43,72.88],[78.74,73.22],[77.06,73.33],[75.4,73.25],[73.78,72.98]],[[70.74,72.0],[69.25,71.3],[67.82,70.48],[66.43,69.55],[65.09,68.55],[63.8,67.46],[62.55,66.31],[61.35,65.11],[60.18,63.85],[59.06,62.56],[57.96,61.23],[56.9,59.87],[55.86,58.49],[54.84,57.09],[53.84,55.68],[52.86,54.25],[51.88,52.81]],[[50.0,50.0],[49.04,48.56],[48.07,47.12],[47.1,45.68],[46.11,44.26],[45.11,42.84],[44.09,41.44],[43.05,40.06],[41.99,38.71],[40.89,37.38],[39.76,36.09],[38.59,34.84],[37.39,33.63],[36.14,32.48],[34.85,31.4],[33.51,30.4],[32.12,29.48]],[[29.26,28.0],[27.72,27.43],[26.14,27.0],[24.52,26.74],[22.86,26.67],[21.18,26.79],[19.49,27.14],[17.8,27.73],[16.13,28.57],[14.5,29.68],[12.94,31.05],[11.47,32.69],[10.13,34.6],[8.93,36.76],[7.9,39.14],[7.08,41.71],[6.48,44.43]],[[6.0,50.0],[6.13,52.88],[6.5,55.7],[7.11,58.42],[7.95,60.98],[8.98,63.35],[10.19,65.5],[11.54,67.39],[13.02,69.02],[14.58,70.38],[16.21,71.47],[17.88,72.3],[19.57,72.88],[21.26,73.22],[22.94,73.33],[24.6,73.25],[26.22,72.98]],[[29.26,72.0],[30.75,71.3],[32.18,70.48],[33.57,69.55],[34.91,68.55],[36.2,67.46],[37.45,66.31],[38.65,65.11],[39.82,63.85],[40.94,62.56],[42.04,61.23],[43.1,59.87],[44.14,58.49],[45.16,57.09],[46.16,55.68],[47.14,54.25],[48.12,52.81]],[[50.0,50.0],[50.96,48.56],[51.93,47.12],[52.9,45.68],[53.89,44.26],[54.89,42.84],[55.91,41.44],[56.95,40.06],[58.01,38.71],[59.11,37.38],[60.24,36.09],[61.41,34.84],[62.61,33.63],[63.86,32.48],[65.15,31.4],[66.49,30.4],[67.88,29.48]],[[70.74,28.0],[72.28,27.43],[73.86,27.0],[75.48,26.74],[77.14,26.67],[78.82,26.79],[80.51,27.14],[82.2,27.73],[83.87,28.57],[85.5,29.68],[87.06,31.05],[88.53,32.69],[89.87,34.6],[91.07,36.76],[92.1,39.14],[92.92,41.71],[93.52,44.43]]],"h":[1,0,0,0,1,0,0,0],"c":[50,50,0],"rc":"#141210","cc":"#141210","inf":1}};
var HeydayMotion = (function(){
  var RM = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var NS = "http://www.w3.org/2000/svg", DEG = Math.PI/180, H = 11, HA = 40*DEG, N = 16;
  var ease = {
    io: function(t){ return t<.5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2; },
    back: function(t){ var c1=1.70158, c3=c1+1; return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2); }
  };
  function rgb(h){ return [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)]; }
  function mixc(a, b, t){ var x = a, y = b; return [x[0]+(y[0]-x[0])*t, x[1]+(y[1]-x[1])*t, x[2]+(y[2]-x[2])*t]; }
  function css(c){ return "rgb(" + Math.round(c[0]) + "," + Math.round(c[1]) + "," + Math.round(c[2]) + ")"; }
  function infRays(phase){
    var out = [];
    for (var i=0;i<8;i++){ var ray = [];
      for (var k=0;k<=N;k++){ var ph = i*Math.PI/4 + 0.7*k/N + phase, sn = Math.sin(ph), den = 1+sn*sn;
        ray.push([50 + 44*Math.cos(ph)/den, 50 + 66*sn*Math.cos(ph)/den]); }
      out.push(ray); }
    return out;
  }
  /* The sun is always one colour. A mark can be given its own sun colour, to suit the section it sits in. */
  function geomOf(name, phase, sun){
    var s = HEYDAY_SHAPES[name], rc = s.rc, cc = s.cc;
    if (name === "sun" && sun){ rc = sun; cc = sun; }
    return {r: s.inf ? infRays(phase) : s.r, h: s.h, c: s.c, rc: rgb(rc), cc: rgb(cc)};
  }
  var marks = [], last = 0, running = false;
  function Mark(svg, wrap, start, opts){
    this.svg = svg; this.wrap = wrap; this.name = start; this.visible = true; this.tw = [];
    this.sun = opts && opts.sun;
    this.s = {t:1, rot:0, spin:0, phase:0, flow:0, boost:0};
    this.from = geomOf(start, 0, this.sun);
    svg.setAttribute("viewBox", "0 0 100 100");
    this.paths = [];
    for (var i=0;i<8;i++){
      var p = document.createElementNS(NS, "path");
      p.setAttribute("fill","none"); p.setAttribute("stroke-width","8");
      p.setAttribute("stroke-linecap","round"); p.setAttribute("stroke-linejoin","round");
      svg.appendChild(p); this.paths.push(p);
    }
    this.core = document.createElementNS(NS, "circle");
    svg.appendChild(this.core);
    marks.push(this); this.render(); loop();
  }
  Mark.prototype.cur = function(){
    var s = this.s, A = this.from, B = geomOf(this.name, s.phase, this.sun), t = s.t, e = t;
    var cs = Math.cos(s.rot*DEG), sn = Math.sin(s.rot*DEG), r = [], h = [];
    function rot(x, y){ var dx = x-50, dy = y-50; return [50 + dx*cs - dy*sn, 50 + dx*sn + dy*cs]; }
    for (var i=0;i<8;i++){ var ray = [];
      for (var k=0;k<=N;k++){ var a = A.r[i][k], b = B.r[i][k]; ray.push(rot(a[0]+(b[0]-a[0])*e, a[1]+(b[1]-a[1])*e)); }
      r.push(ray); h.push(A.h[i]+(B.h[i]-A.h[i])*e); }
    var cc = rot(A.c[0]+(B.c[0]-A.c[0])*e, A.c[1]+(B.c[1]-A.c[1])*e);
    return {r:r, h:h, c:[cc[0], cc[1], A.c[2]+(B.c[2]-A.c[2])*e], rc:mixc(A.rc, B.rc, e), cc:mixc(A.cc, B.cc, e)};
  };
  Mark.prototype.render = function(){
    var g = this.cur(), col = css(g.rc);
    for (var i=0;i<8;i++){
      var pts = g.r[i], tip = pts[N], pr = pts[N-2], dx = tip[0]-pr[0], dy = tip[1]-pr[1], L = Math.hypot(dx,dy) || 1;
      dx/=L; dy/=L;
      var hh = H*g.h[i];
      var d = "M" + pts.map(function(p){ return p[0].toFixed(2) + " " + p[1].toFixed(2); }).join("L");
      if (hh > .3){
        var arm = function(sg){ var c=Math.cos(sg*HA), si=Math.sin(sg*HA); return (tip[0]-(dx*c-dy*si)*hh).toFixed(2) + " " + (tip[1]-(dx*si+dy*c)*hh).toFixed(2); };
        d += "M" + arm(1) + "L" + tip[0].toFixed(2) + " " + tip[1].toFixed(2) + "L" + arm(-1);
      }
      this.paths[i].setAttribute("d", d); this.paths[i].setAttribute("stroke", col);
    }
    var b = this.s.boost, r = g.c[2] + (46 - g.c[2])*b;
    this.core.setAttribute("cx", g.c[0].toFixed(2)); this.core.setAttribute("cy", g.c[1].toFixed(2));
    this.core.setAttribute("r", Math.max(0, r).toFixed(2)); this.core.setAttribute("fill", css(b > 0 ? g.rc : g.cc));
  };
  Mark.prototype.to = function(target, dur, ez){
    var self = this, from = {};
    for (var k in target) from[k] = this.s[k];
    if (RM || !dur){ for (k in target) this.s[k] = target[k]; this.render(); return Promise.resolve(); }
    return new Promise(function(res){ self.tw.push({from:from, target:target, t0:performance.now(), dur:dur, ez:ez || ease.io, res:res}); loop(); });
  };
  Mark.prototype.morph = function(name, dur){
    this.from = this.cur(); this.s.rot = 0; this.s.spin = 0; this.s.flow = 0; this.s.phase = 0; this.s.t = 0; this.name = name;
    var self = this;
    return this.to({t:1}, dur == null ? 900 : dur).then(function(){
      var sh = HEYDAY_SHAPES[name];
      if (!RM && sh.spin) self.s.spin = 60;
      if (!RM && sh.inf) self.s.flow = .9;
      loop();
    });
  };
  Mark.prototype.stop = function(){ this.tw.forEach(function(t){ t.res(); }); this.tw = []; this.s.spin = 0; this.s.flow = 0; };
  Mark.prototype.bounce = function(){
    if (RM || !this.wrap || !this.wrap.animate) return;
    this.wrap.animate([
      {transform:"translateY(0) scale(1,1)"},
      {transform:"translateY(-12%) scale(.95,1.05)", offset:.35},
      {transform:"translateY(0) scale(1.08,.92)", offset:.62},
      {transform:"translateY(-3%) scale(.98,1.02)", offset:.8},
      {transform:"translateY(0) scale(1,1)"}
    ], {duration:700, easing:"ease-out"});
  };
  function frame(now){
    var dt = Math.min(.05, (now - (last || now))/1000), busy = false; last = now;
    marks.forEach(function(m){
      var s = m.s;
      if (!m.tw.length && !(m.visible && (s.spin || s.flow))) return;
      busy = true;
      s.rot += s.spin*dt; s.phase += s.flow*dt;
      m.tw = m.tw.filter(function(tw){
        var p = Math.min(1, (now - tw.t0)/tw.dur), e = tw.ez(p);
        for (var k in tw.target) s[k] = tw.from[k] + (tw.target[k]-tw.from[k])*e;
        if (p >= 1){ tw.res(); return false; }
        return true;
      });
      m.render();
    });
    if (busy) requestAnimationFrame(frame); else { running = false; last = 0; }
  }
  function loop(){ if (!running){ running = true; requestAnimationFrame(frame); } }
  return {Mark: Mark, ease: ease, RM: RM, shapes: HEYDAY_SHAPES};
})();

(function(){
var RM = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
function each(sel, fn){ [].slice.call(document.querySelectorAll(sel)).forEach(fn); }
/* rise (mariamontessori.org): up 2em as it arrives, back down when you scroll back up */
var riseObs = new IntersectionObserver(function(es){ es.forEach(function(e){
  if (e.isIntersecting) e.target.classList.add("in"); else if (e.boundingClientRect.top > 0) e.target.classList.remove("in"); }); }, {rootMargin:"0px 0px -10% 0px"});
each("[data-rise],[data-rise-parent]", function(el){ riseObs.observe(el); });
/* sheets: each one's colour fades in from the one before */
var sheets = [].slice.call(document.querySelectorAll("[data-sheet]"));
sheets.forEach(function(s, i){ var prev = i ? getComputedStyle(sheets[i-1]).getPropertyValue("--c") : ""; if (prev){ s.style.setProperty("--prev", prev); s.classList.add("pre"); } });
var sheetObs = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting) e.target.classList.remove("pre"); else if (e.boundingClientRect.top > 0 && e.target.style.getPropertyValue("--prev")) e.target.classList.add("pre"); }); }, {threshold:.18});
sheets.forEach(function(s){ sheetObs.observe(s); });
/* hero step dots follow the cards */
each(".hline[data-cycle]", function(h){ var dots = [].slice.call(h.querySelectorAll("i")), k = 0;
  function tick(){ dots.forEach(function(d, i){ d.classList.toggle("on", i === k); }); k = (k + 1) % dots.length; } tick(); if (!RM) setInterval(tick, 3000); });
/* scroll-driven: parallax, statement words, sideways tracks */
var par = [].slice.call(document.querySelectorAll("[data-parallax]"));
var words = [].slice.call(document.querySelectorAll("[data-words]"));
var sides = [].slice.call(document.querySelectorAll("[data-side]")).map(function(s){ return {s:s, t:s.querySelector(".track"), b:s.querySelector(".prog b")}; });
function sizeSides(){ sides.forEach(function(o){ if (innerWidth <= 760 || RM){ o.s.style.height = ""; return; } o.extra = Math.max(0, o.t.scrollWidth - innerWidth + 120); o.s.style.height = (innerHeight + o.extra) + "px"; }); }
function onScroll(){
  var vh = innerHeight;
  if (!RM) par.forEach(function(el){ var r = el.getBoundingClientRect(); var c = (r.top + r.height/2 - vh/2) / vh; el.style.transform = "translateY(" + (-c * 80 * parseFloat(el.getAttribute("data-parallax"))) + "px)"; });
  words.forEach(function(sec){ var ws = sec.querySelectorAll(".wd"), r = sec.getBoundingClientRect(); var p = Math.min(1, Math.max(0, (vh*0.85 - r.top) / (r.height*0.9))); var n = Math.round(p * ws.length); [].forEach.call(ws, function(w, i){ w.classList.toggle("on", RM || i < n); }); });
  sides.forEach(function(o){ if (innerWidth <= 760 || RM) return; var r = o.s.getBoundingClientRect(); var p = Math.min(1, Math.max(0, -r.top / (o.s.offsetHeight - vh))); o.t.style.transform = "translateX(" + (-p * o.extra) + "px)"; if (o.b) o.b.style.width = (p*100) + "%"; });
}
addEventListener("scroll", function(){ requestAnimationFrame(onScroll); }, {passive:true});
addEventListener("resize", function(){ sizeSides(); onScroll(); });
addEventListener("load", function(){ sizeSides(); onScroll(); });
sizeSides(); onScroll();
/* sticky scroll (honeybook.com): the copy scrolls, the picture changes */
var HM = HeydayMotion, Mark = HM.Mark;
function wait(ms){ return new Promise(function(r){ setTimeout(r, ms); }); }
function sunFor(n){ var c = HM.shapes[n].rc; return (c === "#141210" || c === "#F26B2A") ? "#93B7E8" : c; }
each(".stk", function(stk){ var blocks = [].slice.call(stk.querySelectorAll(".blocks > div")), screens = [].slice.call(stk.querySelectorAll(".scr")), panel = stk.querySelector(".stage .panel");
  var dots = [].slice.call(stk.querySelectorAll(".vline i"));
  /* an optional mark above the panel that changes with the block (the AI levels: sun, loop, infinity) */
  var sm = stk.querySelector("[data-stage-mark]"), smark = null;
  if (sm){ smark = new Mark(sm.querySelector("svg"), sm, "sun", {sun: "#93B7E8"}); smark.visible = true; }
  var o = new IntersectionObserver(function(es){ es.forEach(function(e){ if (!e.isIntersecting) return; var i = blocks.indexOf(e.target);
    screens.forEach(function(s, j){ s.classList.toggle("on", j === i); }); dots.forEach(function(d, j){ d.classList.toggle("on", j <= i); });
    if (panel) panel.style.setProperty("--sc", e.target.getAttribute("data-c"));
    var sh = e.target.getAttribute("data-shape"); if (smark && sh && smark.name !== sh){ smark.stop(); (RM ? Promise.resolve() : smark.morph("sun", 400)).then(function(){ return smark.morph(sh, RM ? 0 : 900); }); } }); }, {threshold:.6});
  blocks.forEach(function(b){ o.observe(b); }); });
/* shapes that form from the sun as they arrive; data-cycle turns through a list of shapes, back through the sun each time */
each("[data-mark]", function(el){ var name = el.getAttribute("data-mark"); var svg = el.querySelector("svg"); var m = new Mark(svg, el, RM ? name : "sun", {sun: sunFor(name)}), done = RM;
  var cyc = (el.getAttribute("data-cycle") || "").split(" ").filter(Boolean), j = cyc.indexOf(name);
  function cycle(){ if (RM || !cyc.length) return; setTimeout(function(){ if (!m.visible) return cycle(); m.morph("sun", 600).then(function(){ j = (j + 1) % cyc.length; return m.morph(cyc[j], 900); }).then(cycle); }, 2300); }
  var io = new IntersectionObserver(function(es){ es.forEach(function(e){ m.visible = e.isIntersecting; if (e.isIntersecting && !done){ done = true; setTimeout(function(){ m.morph(name).then(function(){ if (el.hasAttribute("data-bounce")) m.bounce(); cycle(); }); }, 200); } }); }, {threshold:.3}); io.observe(el);
  el._mark = m; });
/* feature rows: the shape grows into the row on "How it fits together" */
function anim(dur, fn){ return new Promise(function(res){ if (RM){ fn(1); res(); return; } var t0 = performance.now(); (function f(now){ var p = Math.min(1, (now - t0)/dur); fn(p); if (p < 1) requestAnimationFrame(f); else res(); })(t0); }); }
function sstep(a, b, x){ var t = Math.max(0, Math.min(1, (x - a)/(b - a))); return t*t*(3 - 2*t); }
each(".row-sheet", function(sec, n){
  var shape = sec.getAttribute("data-shape"), openB = sec.querySelector(".open-b"), backB = sec.querySelector(".back-b"),
      more = sec.querySelector(".frow-more"), rest = sec.querySelector(".frow-rest"), wrap = sec.querySelector(".bounce"), svg = wrap.querySelector("svg");
  var m = new Mark(svg, wrap, RM ? shape : "sun", {sun: sunFor(shape)}), shown = RM;
  var io = new IntersectionObserver(function(es){ es.forEach(function(e){ m.visible = e.isIntersecting; if (e.isIntersecting && !shown){ shown = true; m.morph(shape); } }); }, {threshold:.4}); io.observe(wrap);
  var isOpen = false, busy = false, K = 1;
  function geo(){ var a = sec.getBoundingClientRect(), b = svg.getBoundingClientRect(), c = HM.shapes[shape].c, S = b.width;
    var cx = b.left - a.left + S*c[0]/100, cy = b.top - a.top + S*c[1]/100;
    var far = Math.max(Math.hypot(cx,cy), Math.hypot(a.width-cx,cy), Math.hypot(cx,a.height-cy), Math.hypot(a.width-cx,a.height-cy));
    svg.style.transformOrigin = c[0] + "% " + c[1] + "%"; return far*100/(46*S)*1.08; }
  function grow(p){ var e = p*p*p; svg.style.transform = "scale(" + (1 + (K-1)*e).toFixed(4) + ")"; m.s.boost = sstep(.2, .85, p); m.render(); }
  if (openB) openB.addEventListener("click", function(){ if (isOpen || busy) return; busy = true; m.stop();
    (m.name === shape ? Promise.resolve() : m.morph(shape, 300)).then(function(){ K = geo(); return anim(900, grow); }).then(function(){
      sec.classList.add("open"); more.inert = false; rest.inert = true; svg.style.transform = ""; m.s.boost = 0; m.render();
      requestAnimationFrame(function(){ sec.classList.add("shown"); backB.focus({preventScroll:true}); isOpen = true; busy = false; }); }); });
  function close(){ if (!isOpen || busy) return; busy = true; sec.classList.remove("shown");
    wait(RM ? 0 : 220).then(function(){ K = geo(); grow(1); sec.classList.remove("open"); more.inert = true; rest.inert = false; return anim(700, function(p){ grow(1 - p); }); })
    .then(function(){ svg.style.transform = ""; m.s.boost = 0; m.render(); openB.focus({preventScroll:true}); isOpen = false; busy = false; m.bounce(); }); }
  if (backB) backB.addEventListener("click", close); sec.addEventListener("keydown", function(e){ if (e.key === "Escape") close(); });
  if (!RM) setTimeout(function hey(){ if (!isOpen && !busy && m.visible && shown){ m.morph("sun", 700).then(function(){ m.bounce(); return wait(1400); }).then(function(){ if (!isOpen && !busy) return m.morph(shape, 700); }); } setTimeout(hey, 7000); }, 4000 + n*1800);
});
/* filters: buttons with data-filter show cards whose data-tags include it */
each(".filterbar", function(bar){ var target = document.querySelector(bar.getAttribute("data-target")); if (!target) return;
  bar.addEventListener("click", function(e){ var b = e.target.closest("button[data-filter]"); if (!b) return; [].forEach.call(bar.querySelectorAll("button"), function(x){ x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
    var f = b.getAttribute("data-filter"); [].forEach.call(target.querySelectorAll("[data-tags]"), function(c){ c.hidden = !(f === "all" || c.getAttribute("data-tags").split(" ").indexOf(f) > -1); });
    [].forEach.call(target.querySelectorAll("[data-filter-group]"), function(g){ g.hidden = !g.querySelector("[data-tags]:not([hidden])"); }); }); });
/* goal tabs (getjobber.com): a pill swaps the picture, the stat cards and the words */
each("[data-tabs]", function(box){ var tabs = [].slice.call(box.querySelectorAll('[role="tab"]'));
  function pick(t, focus){ tabs.forEach(function(x){ var on = x === t, p = document.getElementById(x.getAttribute("aria-controls"));
      x.setAttribute("aria-selected", on ? "true" : "false"); x.tabIndex = on ? 0 : -1; p.hidden = !on;
      if (on){ p.classList.remove("swap"); void p.offsetWidth; p.classList.add("swap"); } }); if (focus) t.focus(); }
  tabs.forEach(function(t, i){ t.addEventListener("click", function(){ pick(t); });
    t.addEventListener("keydown", function(e){ var k = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0; if (k){ e.preventDefault(); pick(tabs[(i + k + tabs.length) % tabs.length], true); } }); }); });
})();
