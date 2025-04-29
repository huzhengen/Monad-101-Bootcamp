## 第二章：Solidity 快速入门

### 一、填空题

1. Solidity中存储成本最高的变量类型是`storage`变量，其数据永久存储在区块链上。  
2. 使用`constant`关键字声明的常量可以节省Gas费，其值必须在编译时确定。  
4. 当合约收到不带任何数据的以太转账时，会自动触发`fallback`函数。  

### 二、选择题

4. 函数选择器(selector)的计算方法是： B 
   **A)** sha3(函数签名)  
   **B)** 函数名哈希的前4字节  
   **C)** 函数参数的ABI编码  
   **D)** 函数返回值的类型哈希  

5. 以下关于mapping的叙述错误的是： C 
   **A)** 键类型可以是任意基本类型  
   **B)** 值类型支持嵌套mapping  
   **C)** 可以通过`length`属性获取大小  
   **D)** 无法直接遍历所有键值对  

### 三、简答题

6. 请说明`require`、`assert`、`revert`三者的使用场景差异（从触发条件和Gas退还角度）

require:
触发条件：
require 用于检查 外部输入 或 条件 是否满足，通常用于验证用户输入、外部调用参数或状态条件。
如果 require 的条件（require(condition, "error message")）为 false，交易会失败并回滚。
Gas 退还：
当 require 失败时，交易会立即回滚。
剩余的 Gas 会被退还（除了已经消耗的部分，例如执行到 require 之前的 Gas）。
从 Solidity 0.8.0 开始，require 失败会触发 Error(string) 异常，Gas 消耗较少。

assert：
触发条件：
assert 用于检查 代码内部不变量（invariants），即开发者认为 永远不应该失败 的条件。
如果 assert 的条件（assert(condition)）为 false，交易会失败并回滚。
Gas 退还：
当 assert 失败时，交易会回滚。
不会退还剩余 Gas：assert 失败会触发 Panic(uint256) 异常（Solidity 0.8.0 及以上），并 消耗所有剩余 Gas。
这是因为 assert 失败通常表示代码中存在严重错误（bug），Solidity 设计上不鼓励退还 Gas。

revert：
触发条件：
revert 是一种 手动触发回滚 的机制，开发者可以显式调用 revert() 或 revert("error message")。
通常用于 复杂条件检查 或 自定义错误处理，当条件不满足时主动中止交易。
Gas 退还：
当 revert 被触发时，交易会回滚。
剩余的 Gas 会被退还（除了已经消耗的部分）。
从 Solidity 0.8.0 开始，revert 可以触发 Error(string) 异常，Gas 消耗与 require 类似。

7. 某合约同时继承A和B合约，两者都有`foo()`函数：

```solidity
contract C is A, B {
    function foo() override(A,B) {...}
}
```
实际执行时会调用哪个父合约的函数？为什么？

1）C 提供了自己的 foo():C 提供了自己的 foo() 实现，调用 C.foo() 会执行 C 的实现 {...}，不会调用 A 或 B 的 foo()。

2）由于 C 已经定义了 foo() 并使用 override(A, B)：
当调用 C 的 foo() 时：直接执行 C 的 foo() 实现;不会调用 A 或 B 的 foo()，因为 C 的实现覆盖了父合约的实现。
函数调用规则:当调用 C.foo() 时，Solidity 会沿着线性化顺序查找第一个定义了 foo() 的合约。 顺序：C -> B -> A.
由于 C 没有定义 foo()（假设），会先检查 B。 如果 B 定义了 foo()，则调用 B.foo()，不再继续查找 A。

8. 当使用`call`方法发送ETH时，以下两种写法有何本质区别？

```solidity
(1) addr.call{value: 1 ether}("")
(2) addr.transfer(1 ether)
```
addr.call{value: 1 ether}("") 更灵活但风险更高，适合需要自定义逻辑的场景；需要手动检查返回值，存在重入攻击风险。
addr.transfer(1 ether) 更安全但限制较多，适合简单转账；Gas 固定为 2300，失败时自动回滚，但可能因 Gas 不足而失败。
