![](https://atech.blog/attachment/9ce149a0-10ba-4e29-9153-4c12741cfbb4/pWymrY1.png)

Having broken out a notepad we can examine the basic structure of the commit graph. Commits are arranged from newest to oldest, each on their own line. Each commit is also given it's own branch, arranged from left to right. These two pieces of data give us enough information to arrange commits in a two dimensional space.

To draw the commits we simply need to iterate over them taking their y-coordinate from their position in the list, and the x-coordinate from the branch.

Arranging the branches is simply a case of following the parents of a commit. When a commit is processed, we tag it's parent as belonging to the same branch. If we get to a commit and find it's parent is already in another branch then we know we're dealing with a new branch and draw a split. If a commit has 2 parents, it is a merge and we can draw a line them linking up.

With the branch and commit details figured out we know that each iteration will involve drawing a commit and drawing a line for the branch that commit is on. However, we don't necessarily know at this point how long it will be until we meet the next commit on our branch. To deal with this we need to keep a list of currently active branches. Then, every iteration where nothing happens to a branch we can draw a straight line to continue it.

It can't be guaranteed that all branches that we render will have their current commit included, makes it difficult to determine the branch name. Since the branch name is never displayed on the graph itself we generate sequential numbers to represent branches whenever we see a new one.

https://www.codebasehq.com/blog/building-commit-graphs

https://github.com/tclh123/commits-graph/blob/master/js/src/jquery.commits-graph.js
https://github.com/tclh123/commits-graph/blob/master/git/commits_graph.py

https://github.com/jsdf/react-commits-graph/blob/master/src/generate-graph-data.coffee
