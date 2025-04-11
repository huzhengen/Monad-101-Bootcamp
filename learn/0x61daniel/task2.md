## 第二章：Solidity 快速入门

### 一、填空题

1.  Solidity 中存储成本最高的变量类型是`storage`变量，其数据永久存储在区块链上。
2.  使用`constant`关键字声明的常量可以节省 Gas 费，其值必须在编译时确定。
3.  当合约收到不带任何数据的以太转账时，会自动触发`receive` / `fallback`函数。

---

### 二、选择题

4.  ： A

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

    -   require(bool, "msg"); 当条件表达式为`false`时触发， 可以抛出自定义错误信息

    #### **Gas 退还**

    -   退还剩余的 Gas, 已消耗的 gas 不会退

    ***

    ### **2. `assert`**

    #### **触发条件**

    -   assert(bool); 当条件表达式为`false`时触发, 无法抛出错误信息

    #### **Gas 退还**

    -   不会退还任何 Gas

    ***

    ### **3. `revert`**

    #### **触发条件**

    -   revert("msg"); 调用时直接触发

    #### **Gas 退还**

    -   退还剩余的 Gas

---

7.  某合约同时继承 A 和 B 合约，两者都有`foo()`函数：

```solidity
contract C is A, B {
    function foo() override(A,B) {...}
}
```

实际执行时会调用哪个父合约的函数？为什么？

执行的是自身的 foo 函数

原因：

override 关键字重载父类 foo 实现

---

8.  当使用`call`方法发送 ETH 时，以下两种写法有何本质区别？

```solidity
(1) addr.call{value: 1 ether}("")
(2) addr.transfer(1 ether)
```

---

call 能返回调用是成功或失败，并且可以指定需要的 gas， 可以调用目标函数所有的 pulbic 方法
transfer 场景单一， 失败整个交易直接 fail, 无法指定 gas

---
