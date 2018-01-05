var app = angular.module("myApp",["ngRoute"]);

app.controller("addProduct",function($scope,$http)
				{
					$scope.pTitle = "";
					$scope.pPrice = "";
					$scope.pAvail = "";
					$scope.pImage = "";
					$scope.pcategory = "";
					$scope.msg = "";
					$scope.addProd = function()
									{
										
									  var request = $http({
															method:"POST",
															url: "product.php",
															data: {
																	title:$scope.pTitle,
																    price:$scope.pPrice,
																	availability:$scope.pAvail,
																	category:$scope.pcategory
																  },
															headers: {'Content-type': 'application/x-www-form-urlencoded'}
														  }).then(function(response){
															  //console.log(response.data);
															  if(response.data == "success")
															  {
																$scope.msg = "Product Saved Successfully";  
																$scope.pTitle = "";
																$scope.pPrice = "";
																$scope.pAvail = "";
																$scope.pcategory = "";
															  }else{
																  $scope.msg = "Failed to save";
															  }
														  });
									};
				});

app.controller("productDisplay",function($scope,$http,addCart)
				{
					$scope.products = [];
					
					var request = $http({
											method:"POST",
											url: "productDisplay.php",
											data:"",
											headers:{'Content-type': 'application/json'}
										})
										.then(function(response)
												{
													$scope.products = response.data;
													$scope.length = $scope.products.length;
												});
					    $scope.numberOfPages=function(){
						return Math.ceil($scope.length/5);                
						};
						
					$scope.addToCart = function(input)
										{
											$scope.cartItemsSelected = addCart.cart(input);
										};	
    		});

app.service("addCart",function()
				{
					this.cartItems = [];
					this.cart = function(input)
								{
									this.cartItems.push(input);
									return this.cartItems.length;
								}
				});			
			
app.filter("pagination",function()
			{
				var f1 = function(input,start)
							{
							 start = +start; //parse to int
							 return input.slice(start);
							}	
					return f1;		
			});

app.controller("addToCart",function($scope,addCart)
				{
					$scope.items = addCart.cartItems;
				});			
			
/*app.filter("cartItems",function()
			{
				var cartProducts = function(input,productId)
									{
										var output = [];
										for(var i=0;i<input.length;i++)
										{
											for(var j=0;j<productId.length;j++)
											{
												if(input[i].id == productId[j])
												{
													output.push(input[i]);
													alert(input[i].id);
												}
											}
											return output;
										}
										return cartProducts;
									}
				
			});*/
			
app.controller("searchProduct",function($scope,$http)
				{
					$scope.sname = "";
					$scope.scategory = "";
					$scope.sprice1 = 0;
					$scope.sprice2 = 45000;
					$scope.search =  $http({
											method:"POST",
											url: "productDisplay.php",
											data: "",
											headers: {'Content-type': 'application/json'}
										  }).then(function(response)
													{
														$scope.searchData = response.data;	
													  console.log(response.data);
													});
				});
app.controller("registerUser",function($scope,$http)
				{
					$scope.email = "";
					$scope.uname = "";
					$scope.pwd = "";
					$scope.register = function()
										{
											var request = $http({
																	method:"POST",
																	url: "register.php",
																	data: {
																			email:$scope.email,
																			uname:$scope.uname,
																			pwd:$scope.pwd
																		  },
																	headers: {'Content-type': 'application/x-www-form-urlencoded'}
														  }).then(function(response)
																{
																  console.log(response.data);
																});
										};
				});

app.controller("loginUser",function($scope,$http,$location)
				{
					$scope.email = "";
					$scope.pwd = "";
					$scope.login = function()
									{
										var request = $http({
																method:"POST",
																url : "login.php",
																data:{
																		email:$scope.email,
																		pwd:$scope.pwd
																	 },
																headers:{'Content-type':'application/x-www-form-urlencoded'}
														}).then(function(response)
																{
																	console.log(response.data);
																	$location.url("/itemsDisplay.html")
																});
																
									}
				});
				
app.config(function($routeProvider)
			{
				$routeProvider.when("/home",
									{
										templateUrl:"itemsDisplay.html",
										controller:"productDisplay",
									//	controller:"addToCart"
				})
				.when("/search",
						{
						templateUrl:"search.html",
						controller:"searchProduct"
				})
				.when("/login",
					{
						templateUrl:"userlogin.html",
						controller:"registerUser",
						controller:"loginUser"
				})
				.when("/cart",
				{
					templateUrl:"cart.html",
					controller:"addToCart"
				})
                .otherwise({
					redirectTo:"/home"
				});
        	});
			
//