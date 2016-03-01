//APP
var app = angular.module('skeletonApp', ['ui.router']);

//FACTORY
app.factory('posts', [function(){
	var o = {
		posts: []
	};
	return o;
}]);

//CONTROLLERS
app.controller('MainCtrl', [
	'$scope',
	'posts',
	function($scope,posts){
		$scope.test = 'WELCOME TO BLAKES FIRST MEAN APP';
		$scope.posts = [ {title:'post 1',upvotes:5},
  				      	 {title:'post 2',upvotes:9},
 				      	 {title:'post 3',upvotes:2},
					     {title:'post 4',upvotes:15},
					     {title:'post 5',upvotes:4}];
		$scope.posts = posts.posts;
		$scope.incrementUpvotes = function(post){
			post.upvotes += 1;
		};
		$scope.addPost = function(){
			if(!$scope.title || $scope.title == ''){
				return;
			}
			$scope.posts.push({title: $scope.title, link: $scope.link, upvotes:0, 
				comments: [
    				{author: 'Joe', body: 'Cool post!', upvotes: 0},
    				{author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}

				]
			});
			$scope.title = '';
			$scope.link = '';
		};
	}]);
app.controller('PostsCtrl', [
	'$scope',
	'$stateParams',
	'posts',
	function($scope, $stateParams, posts){
		$scope.post = posts.posts[$stateParams.id];
		console.log($scope.post);
		$scope.addComment = function(){
			if($scope.body == ''){ return; }
			$scope.post.comments.push({
				body: $scope.body,
				author: 'user',
				upvotes: 0
			});
		$scope.body = '';	
		}
	}])

//CONFIGURE ROUTING
app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('home', {
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainCtrl'
			});
		$stateProvider	
			.state('posts',{
				url: '/posts/{id}',
				templateUrl: '/posts.html',
				controller: 'PostsCtrl'
			});
		$urlRouterProvider.otherwise('home');

	}]);