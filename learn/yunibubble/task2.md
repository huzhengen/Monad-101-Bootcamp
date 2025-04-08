## 第二章：Solidity 快速入门

### 一、填空题

1.  Solidity 中存储成本最高的变量类型是`storage`变量，其数据永久存储在区块链上。
2.  使用`constant`关键字声明的常量可以节省 Gas 费，其值必须在编译时确定。
3.  当合约收到不带任何数据的以太转账时，会自动触发`receive`函数。

---

### 二、选择题

4.  函数选择器(selector)的计算方法是： A

    **A)** sha3(函数签名)  
    **B)** 函数名哈希的前 4 字节  
    **C)** 函数参数的 ABI 编码  
    **D)** 函数返回值的类型哈希

5.  以下关于 mapping 的叙述错误的是： C

    **A)** 键类型可以是任意基本类型  
    **B)** 值类型支持嵌套 mapping  
    **C)** 可以通过`length`属性获取大小  
    **D)** 无法直接遍历所有键值对

---

### 三、简答题

6.  请说明`require`、`assert`、`revert`三者的使用场景差异（从触发条件和 Gas 退还角度）

    ### **1. `require`**

    #### **触发条件**

    - 当条件表达式为`false`时触发。

    #### **Gas 退还**

    - 退还剩余的 Gas

    ***

    ### **2. `assert`**

    #### **触发条件**

    - 当条件表达式为`false`时触发。

    #### **Gas 退还**

    - 不会退还剩余的 Gas

    ***

    ### **3. `revert`**

    #### **触发条件**

    - 调用时直接触发

    #### **Gas 退还**

    - 会退还剩余 Gas

---

7.  某合约同时继承 A 和 B 合约，两者都有`foo()`函数：

```solidity
contract C is A, B {
    function foo() override(A,B) {...}
}
```

实际执行时会调用哪个父合约的函数？为什么？

当合约 `C` 同时继承 `A` 和 `B` 并重写 `foo()` 时：

执行的是自身的 foo 函数

原因：

override 重载了 foo 的实现

---

8.  当使用`call`方法发送 ETH 时，以下两种写法有何本质区别？

```solidity
(1) addr.call{value: 1 ether}("")
(2) addr.transfer(1 ether)
```

---

call 能返回成功或失败
transfer 遇到错误交易整个 tx 直接 fail

call 可以显式指定 gas

- **`transfer`**  
  默认仅转发 **2300 gas**（固定值），若接收方合约的 `fallback` 函数需要更多 gas（如修改状态变量），会导致交易失败（**out-of-gas 错误**）。

- **`call`**  
  可通过 `.gas()` 显式指定 gas 量（如 `call.gas(1000000)...`），默认转发所有剩余 gas（取决于调用方的 gas 剩余量）。

---
