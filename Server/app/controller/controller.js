app.controller("CustomController", function ($scope, $http) {
	var ctrl = {};
	var prod = getProject();

	$scope.nodeSelectedLast = "(NONE)";

	ctrl.selectEvent = function (nodeId, node, event) {
		$scope.nodeSelectedLast = nodeId;
		$scope.$apply();
	}

	$scope.graph = {
		chart: {
			container: "#example-graph",
			levelSeparation: 45,

			rootOrientation: "WEST",

			nodeAlign: "BOTTOM",

			connectors: {
				type: "step",
				style: {
					"stroke-width": 2
				}
			},
			node: {
				HTMLclass: "big-commpany"
			},
			callback: {
        // This refers to custom callback available in https://github.com/Alexlambertz/treant-js
				onClick: function (nodeId, node, event) {
					ctrl.selectEvent(nodeId, node, event);
				}.bind(this),
				onTreeLoaded: function () {
					console.log("Graph loaded!!");
				}
			}
		},

		nodeStructure: /*{
			unique_name: "node1",
			text: {
				name: "CEO"
			},
			connectors: {
				style: {
					'stroke': '#bbb',
					'arrow-end': 'oval-wide-long'
				}
			},
			innerHTML: "<a ng-click=\"gotClick('test')\">LALILU</a>",
			//link: {
			//    href: "http://www.google.com"
			//},
			children: [{
				text: {
					name: "Account"
				},
				stackChildren: true,
				collapsable: true,
				collapsed: true,
				connectors: {
					style: {
						'stroke': '#8080FF',
						'arrow-end': 'block-wide-long'
					}
				},
				children: [{
					text: {
						name: "Receptionist"
					},
					HTMLclass: "reception"
				}, {
					text: {
						name: "Author"
					}
				}]
			}, {
				text: {
					name: "Operation Manager"
				},
				connectors: {
					style: {
						'stroke': '#bbb',
						"stroke-dasharray": "- .", //"", "-", ".", "-.", "-..", ". ", "- ", "--", "- .", "--.", "--.."
						'arrow-start': 'classic-wide-long'
					}
				},
				children: [{
					text: {
						name: "Manager I"
					},
					connectors: {
						style: {
							stroke: "#00CE67"
						}
					},
					children: [{
						text: {
							name: "Worker I"
						}
					}, {
						pseudo: true,
						connectors: {
							style: {
								stroke: "#00CE67"
							}
						},
						children: [{
							text: {
								name: "Worker II"
							}
						}]
					}, {
						text: {
							name: "Worker III"
						}
					}, {
						text: {
							name: "Worker IV"
						}
					}]
				}, {
					text: {
						name: "Manager II"
					},
					connectors: {
						type: "curve",
						style: {
							stroke: "#50688D"
						}
					},
					children: [{
						text: {
							name: "Worker I"
						}
					}, {
						text: {
							name: "Worker II"
						}
					}]
				}, {
					text: {
						name: "Manager III"
					},
					connectors: {
						style: {
							'stroke': '#FF5555'
						}
					},
					children: [{
						text: {
							name: "Worker I"
						}
					}, {
						pseudo: true,
						connectors: {
							style: {
								'stroke': '#FF5555'
							}
						},
						children: [{
							text: {
								name: "Worker II"
							}
						}, {
							text: {
								name: "Worker III"
							}
						}]
					}, {
						text: {
							name: "Worker IV"
						}
					}]
				}]
			}, {
				text: {
					name: "Delivery Manager"
				},
				stackChildren: true,
				connectors: {
					stackIndent: 30,
					style: {
						'stroke': '#E3C61A',
						'arrow-end': 'block-wide-long'
					}
				},
				children: [{
					text: {
						name: "Driver I"
					}
				}, {
					text: {
						name: "Driver II"
					}
				}, {
					text: {
						name: "Driver III"
					}
				}]
			}]
		}*/
		{prod:2865,text:{name:"PAVE FLUIDIQUE INFERIEUR"},children:[{prod:2866,text:{name:"LEGO CLIP MT VERSION HAUT"},children:[{prod:2867,text:{name:"CAME"},children:[]}]},{prod:2868,text:{name:"LEGO CLIP MT VERSION HAUT"},children:[]}]}
	};

	$scope.gotClick = function (temp) {
		console.log("aa *****");
		console.log("temp = " + temp);
	}

	function getProject()
  {
    var str = window.location.search;
    str = str.substr(1);
    return str;
  }

});