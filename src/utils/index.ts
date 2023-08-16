export interface TreeNode<T, L> {
  [key: string]: T | L | TreeNode<T, L>[];
}

// 字典、树形文本回显
export function getLabelByValue<T, L>(
  data: TreeNode<T, L>[],
  value: T,
  replaceFields = { value: 'value', label: 'label' }
): L | null {
  const valueField = replaceFields.value || 'value';
  const labelField = replaceFields.label || 'label';
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    if (node[valueField] === value) {
      return node[labelField] as L;
    }
    if (node.children) {
      const label = getLabelByValue(node.children as TreeNode<T, L>[], value, { value: valueField, label: labelField });
      if (label) {
        return label as L;
      }
    }
  }
  return null;
}
