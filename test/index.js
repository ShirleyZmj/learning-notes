const sidebarMenus = [{
      url: "",
      children: [{
        url: "/app",
        children: [{
            url: "/:id/info",
            children: []
          },
          {
            url: "/:id/detail",
            children: [{
              url: "/group"
            }]
          }
        ]
      }]
    }];
    
    // ['', '/app', '/app/:id/info', '/app/:id/detail', '/app/:id/detail/group'];
const result = [];
const path = [];
function dfs(arr) {
  if(path.length) {
    result.push(path.join(''));
  }
  if(!arr || !arr.length) {
    return;
  }
  for(let item of arr) {
    path.push(item.url);
    bfs(item.children);
    path.pop();
  }
}
dfs(sidebarMenus);
console.log(result);