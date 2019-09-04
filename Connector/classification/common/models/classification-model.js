let DateDiff = require('date-diff');

var product;
var subProduct;

//console.log("produit", produit);

module.exports = function(classificationModel)
{

classificationModel.CheckManufacturingOrderConsistency = function(json, callback)
{
	console.log(json);
	//project = JSON.parse(json);
	product = json; //project;
	try{
		var result = displayTreeNode(product);
		console.log(result);
		callback(result);
	} catch(err) {
		var result = err;
		callback(result);
	}
	
}

function displayTreeNode(node)
{
	console.log(node.produit);
// noeud suivant
	if (node.sous_produit != null)
	{
		if (node.sous_produit.length > 1)
		{
			for (var i = 0; i < node.sous_produit.length; i++) {
				if (checkManufacturer(node, node.sous_produit[i]) == false)
				{
					return false;
				}
				displayTreeNode(node.sous_produit[i]);
			}
		}
		else
		{
			if (checkManufacturer(node, node.sous_produit) == false)
			{
				return false;
			}
			displayTreeNode(node.sous_produit);
		}
	}
	return true;
}

function checkManufacturer(product, subProduct)
{
	//console.log(product.produit + " manufacterd by : " + product.fabricant);
	if (product.fabricant != subProduct.fabricant)
	{
		if (subProduct.date_livraison != null)
		{
			var productDate = setDate(product.date_debut);
			var subProductDate = setDate(subProduct.date_livraison);
			var diff = new DateDiff(productDate, subProductDate);
			if (diff.days() < 0)
			{ 
				return false;
			}
		}
	}
	return true;
}

function setDate(date)
{
	return new Date(date.substr(6,4), date.substr(3,2)-1, date.substr(0,2));
}

classificationModel.remoteMethod('CheckManufacturingOrderConsistency',
	{ 
	  isStatic: true,
	  accepts: 
	   [ { arg: 'json',
	       type: 'Object',
	       description: 'project MO organisation',
	       required: false,
	       http: { source: 'form' } } ],
	       produces:['boolean'],
	  returns: {arg: 'result', type: 'boolean'},
	  http: { verb: 'post', path: '/CheckManufacturingOrderConsistency' },
	  description: undefined }
);

}