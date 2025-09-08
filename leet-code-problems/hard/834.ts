/**
 * @reference https://www.geeksforgeeks.org/dsa/sum-of-length-of-paths-from-every-node-to-all-other-nodes-using-tree-rerooting-technique/
 * @reference https://usaco.guide/gold/all-roots?lang=cpp
 * @reference https://www.youtube.com/watch?v=7_huTWwl5jM
 */

function dist_dp(graph: number[][], n: number): number[] {
  let subtreeSize: number[] = Array(n).fill(0);
  let distSum: number[] = Array(n).fill(0);

  function dfs1(node: number, parent: number, distance: number) {
    subtreeSize[node] = 1;
    distSum[0] += distance;

    for (const neighbor of graph[node]) {
      if (neighbor !== parent) {
        dfs1(neighbor, node, distance + 1);
        subtreeSize[node] += subtreeSize[neighbor];
      }
    }
  }

  function dfs2(node: number, parent: number) {
    for (const neighbor of graph[node]) {
      if (neighbor !== parent) {
        distSum[neighbor] =
          distSum[node] - subtreeSize[neighbor] + (n - subtreeSize[neighbor]);
        dfs2(neighbor, node);
      }
    }
  }

  dfs1(0, -1, 0);
  dfs2(0, -1);

  return distSum;
}

function generateAdjacencyList(n: number, edges: number[][]): number[][] {
  const graph: number[][] = Array.from({ length: n }, () => []);

  for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }

  return graph;
}

function sumOfDistancesInTree(n: number, edges: number[][]): number[] {
  const graph = generateAdjacencyList(n, edges);

  const dpResult = dist_dp(graph, n);

  return dpResult;
}

const test = () => {
  /**
   *    0
   *   / \
   *  1   2
   *     /|\
   *    3 4 5
   *         \
   *          6
   */
  const edges = [
    [0, 1],
    [0, 2],
    [2, 3],
    [2, 4],
    [2, 5],
    // [5, 6],
  ];

  const result = sumOfDistancesInTree(edges.length + 1, edges);


  console.log(result);
};

test();