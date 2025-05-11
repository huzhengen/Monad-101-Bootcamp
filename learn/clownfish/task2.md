## 第二章：Solidity 快速入门

### 一、填空题

1. Solidity中存储成本最高的变量类型是`storage`变量，其数据永久存储在区块链上。  
2. 使用`const`关键字声明的常量可以节省Gas费，其值必须在编译时确定。  
4. 当合约收到不带任何数据的以太转账时，会自动触发`fallback`函数。  

---

### 二、选择题

4. 函数选择器(selector)的计算方法是：  A
   **A)** sha3(函数签名)  
   **B)** 函数名哈希的前4字节  
   **C)** 函数参数的ABI编码  
   **D)** 函数返回值的类型哈希  

5. 以下关于mapping的叙述错误的是：  
   **A)** 键类型可以是任意基本类型  C
   **B)** 值类型支持嵌套mapping  
   **C)** 可以通过`length`属性获取大小  
   **D)** 无法直接遍历所有键值对  

---

### 三、简答题

6. 请说明`require`、`assert`、`revert`三者的使用场景差异（从触发条件和Gas退还角度）
require检查外部输入或业务逻辑条件（如 msg.value >= price），退还未使用的 Gas；
assert检查内部错误（如 balance >= amount），不退还 Gas，用于代码逻辑错误（如算术溢出、合约状态不一致），通常表示严重 bug
revert手动触发回滚（可带错误信息），退还未使用的 Gas

7. 某合约同时继承A和B合约，两者都有`foo()`函数：

```solidity
contract C is A, B {
    function foo() override(A,B) {...}
}
```

实际执行时会调用哪个父合约的函数？为什么？
先调用 C.foo() 中的自定义逻辑。如果 C.foo() 内部调用了 super.foo()，则会按照 B → A 的顺序执行父合约的 foo()。

8. 当使用`call`方法发送ETH时，以下两种写法有何本质区别？

```solidity
(1) addr.call{value: 1 ether}("")
(2) addr.transfer(1 ether)
```

Gas 限制：
transfer 固定Gas（足够接收 ETH，但不足以执行复杂逻辑）。
call 无 Gas 限制（可手动设置 gas），但可能引发重入攻击。
错误处理：
transfer 失败时自动 revert。
call 失败时返回 (bool success, )，需手动检查。

