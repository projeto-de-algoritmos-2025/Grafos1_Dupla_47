#include <bits/stdc++.h>

using namespace std;

/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */

struct TreeNode
{
  int val;
  TreeNode *left;
  TreeNode *right;
  TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

class Solution
{
public:
  TreeNode *removeLeafNodes(TreeNode *root, int target)
  {
    if (root->left)
    {
      root->left = removeLeafNodes(root->left, target);
    }

    if (root->right)
    {
      root->right = removeLeafNodes(root->right, target);
    }

    if (root->val == target && !root->left && !root->right)
    {
      return nullptr;
    }

    return root;
  }
};

string printTree(TreeNode *root)
{
  queue <TreeNode *> q;

  q.push(root);

  vector<string> result;

  while (!q.empty())
  {
    TreeNode *node = q.front();
    q.pop();

    if (node)
    {
      result.push_back(to_string(node->val));
      q.push(node->left);
      q.push(node->right);
    }
    else
    {
      result.push_back("null");
    }
  }

  while (result.back() == "null")
  {
    result.pop_back();
  }

  stringstream ss;

  for (int i = 0; i < result.size(); i++)
  {
    ss << result[i];
    if (i != result.size() - 1)
    {
      ss << ",";
    }
  }

  return ss.str();
}

int main()
{
  ios::sync_with_stdio(false);

  TreeNode *root = new TreeNode(1);
  root->left = new TreeNode(2);
  root->right = new TreeNode(3);
  root->left->left = new TreeNode(2);
  root->left->right = new TreeNode(4);

  Solution solution;


  cout << "[";
  cout << printTree(root);
  cout << "]" << endl;


  solution.removeLeafNodes(root, 2);

  cout << "[";
  cout << printTree(root);
  cout << "]" << endl;

  return 0;
}