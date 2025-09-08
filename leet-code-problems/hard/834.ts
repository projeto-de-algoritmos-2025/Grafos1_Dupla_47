function dist_dp(graph: number[][], n: number) {
  let subtreeSize: number[] = Array(n).fill(0);
  let distSum: number[] = Array(n).fill(0);

  function dfs1(
    node: number,
    parent: number,
    distance: number,
  ) {
    subtreeSize[node] = 1;
    distSum[0] += distance;

    for (const neighbor of graph[node]) {
      if (neighbor !== parent) {
        dfs1(neighbor, node, distance + 1);
        subtreeSize[node] += subtreeSize[neighbor];
      }
    }
  }

  function dfs2(
    node: number,
    parent: number,
  ) {
    for (const neighbor of graph[node]) {
      if (neighbor !== parent) {
        distSum[neighbor] =
          distSum[node] - subtreeSize[neighbor] + (n - subtreeSize[neighbor]);
        dfs2(neighbor, node);
      }
    }
  }

  dfs1(0, -1, 0);
  console.log(distSum, subtreeSize);


  dfs2(0, -1);

  return distSum;
}

function dist(nodeA: number, nodeB: number, graph: number[][]): number {
  if (nodeA === nodeB) return 0;

  const visited = new Set<number>();

  // console.log(visited);

  function dfs(node: number, target: number, distance: number) {
    if (node === target) return distance;

    visited.add(node);

    for (const otherNodes of graph[node] || []) {
      if (!visited.has(otherNodes)) {
        const d = dfs(otherNodes, target, distance + 1);
        if (d !== -1) return d;
      }
    }

    return -1;
  }

  const result = dfs(nodeA, nodeB, 0);

  return result;
}

const generateAdjacencyList = (n: number, edges: number[][]) => {
  const graph: number[][] = Array.from({ length: n }, () => []);



  for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }
  // const graph = new Map<number, number[]>();

  // for (const [a, b] of edges) {
  //   if (!graph.has(a)) graph.set(a, []);
  //   if (!graph.has(b)) graph.set(b, []);

  //   graph.get(a)!.push(b);
  //   graph.get(b)!.push(a);
  // }

  return graph;
};

function sumOfDistancesInTree(n: number, edges: number[][]): number[] {
  const graph = generateAdjacencyList(n, edges);

  const dpResult = dist_dp(graph, n);

  // console.log(dpResult);

  return dpResult;
}

// const test = () => {
//   /**
//    *    0
//    *   / \
//    *  1   2
//    *     /|\
//    *    3 4 5
//    *         \
//    *          6
//    */
//   const edges = [[0,1],[0,2],[2,3],[2,4],[2,5],[5,6]];
//   // console.log(dist(0, 6, generateLinkedList(edges)));
//   const result = sumOfDistancesInTree(6, [[0,1],[0,2],[2,3],[2,4],[2,5]]);
//   console.log(result);
// };

// test();

// https://usaco.guide/gold/all-roots?lang=cpp
// https://www.geeksforgeeks.org/dsa/sum-of-length-of-paths-from-every-node-to-all-other-nodes-using-tree-rerooting-technique/
