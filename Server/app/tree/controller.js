app.controller("CustomController", function ($scope, $http) {
	var ctrl = {};
	var prod = getProject();

	/*$scope.nodeSelectedLast = "(NONE)";*/

	ctrl.selectEvent = function (nodeId, node, event) {
		$scope.nodeSelectedLast = nodeId;
		$scope.$apply();
	}

	$scope.graph = {
		chart: {
			container: "#example-graph",
			levelSeparation:    20,
       		siblingSeparation:  120,
        	subTeeSeparation:   15,

			rootOrientation: "WEST",

			//nodeAlign: "BOTTOM",

			node: {
				HTMLclass: "big-commpany",
				/*collapsable: true*/
			},
			animation: {
				nodeAnimation: "easeOutBounce",
				nodeSpeed: 700,
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
nodeStructure: 
{prod:2865,
	HTMLclass: "product-bot",
	text:{
		name:"PAVE FLUIDIQUE INFERIEUR",
		numofs: "80190925",
		datdebpre: "Beg:2019-03-13", 
		datdebree: "Real:2019-03-13",
		datfinpre:"End:2019-03-25", 
		datfinree:"Real:2019-03-25",
		qty:"Quantity: 12/20"},

children:[

		{prod:2866,
			HTMLclass: "product-bot",
			text:{
				name:"LEGO CLIP HAUT",
				numofs: "80190926",
				affect: "APR",
				datdebpre: "Beg:2019-03-15", 
				datdebree: "Real:2019-03-15",
				datfinpre:"End:2019-03-18", 
				datfinree:"Real:2019-03-18",
				qty:"Quantity: 12/20"},

				children:[
				{prod:2867,
					HTMLclass:"product-bot",
					text:{
						name:"CAME",
						numofs: "80190928",
						affect: "APR",
						datdebpre: "Beg:2019-03-13", 
						datdebree: "Real:2019-03-13",
						datfinpre:"End:2019-03-15", 
						datfinree:"Real:2019-03-15",
						qty:"Quantity: 12/20"},
						children:[]
				}
						]
		}
		,
		{prod:2868,
		HTMLclass:"product-bot",
		text:{
				name:"LEGO CLIP BAS",
				numofs: "80190927",
				affect: "TARDY",
				datdebpre: "Beg:2019-03-13", 
				datdebree: "Real:2019-03-13",
				datfinpre:"End:2019-03-22", 
				datfinree:"Real:2019-03-22",
				qty:"Quantity: 20/20"},
				children:[]
		}
	]
}
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