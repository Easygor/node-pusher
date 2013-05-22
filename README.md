#Node-Pusher

面向浏览器端的实时推送服务器。

##快速开始

###1.安装[node.js][node]环境

下载安装[node.js][node]  
<http://nodejs.org/>	

安装好后检测[node.js][node]版本:  
	
	node --version
	npm -v

node.js&npm版本:	

* node: >= 0.8.11
* npm: >= 1.1.62


###2.开启node-pusher服务

使用命令行进入node-pusher文件夹, 使用如下指令开启服务:	

	cd node-pusher
	npm install
	npm start

访问 <http://localhost:3000"> 查看服务是否成功开启.	


###3.提取日志

日志存放在 node-pusher/logs 目录下， 直接copy即可。	


##开发人员使用

###浏览器客户端

__安装__

	<script type="text/javascript" src="http://node-pusher-host:3000/socket.io/socket.io.js" />
	<script type="text/javascript" src="http://node-pusher-host:3000/js/pusher.js" />

__快速开始__	

查看node-pusher/public/js/app.js文件	

###java客户端 - pusher4j

详情查看pusher4j项目文档


[node]: http://nodejs.org/ "Node.js Home Page"
