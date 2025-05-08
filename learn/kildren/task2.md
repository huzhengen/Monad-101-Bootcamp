## 第二章：Solidity 快速入门

### 一、填空题

1. Solidity中存储成本最高的变量类型是`storage`变量，其数据永久存储在区块链上。  
2. 使用`constant`关键字声明的常量可以节省Gas费，其值必须在编译时确定。  
4. 当合约收到不带任何数据的以太转账时，会自动触发`receive`函数。  

---

### 二、选择题

4. 函数选择器(selector)的计算方法是: B
   **A)** sha3(函数签名)  
   **B)** 函数名哈希的前4字节  
   **C)** 函数参数的ABI编码  
   **D)** 函数返回值的类型哈希  

5. 以下关于mapping的叙述错误的是：C  
   **A)** 键类型可以是任意基本类型  
   **B)** 值类型支持嵌套mapping  
   **C)** 可以通过`length`属性获取大小  
   **D)** 无法直接遍历所有键值对  

---

### 三、简答题

6. 请说明`require`、`assert`、`revert`三者的使用场景差异（从触发条件和Gas退还角度）
- `require`: 验证传入值和指定条件是否相等，如果不相等，则退还剩余的gas给调用者
- `assert`: 触发条件和`require`一致，但失败时会消耗所有gas，不会退还gas
- `revert`: 无条件地中止执行并撤销所有更改。会退还剩余的gas


7. 某合约同时继承A和B合约，两者都有`foo()`函数：

```solidity
contract C is A, B {
    function foo() override(A,B) {...}
}
```

实际执行时会调用哪个父合约的函数？为什么？

- 由于 C 合约 override(A, B)，所以C合约的foo()实际上覆盖了A、B的foo()函数。实际调用时，会调用C自身定义的foo()函数。如果C的foo()函数里面有super.foo()，那么会调用B合约的foo()函数，如果B合约的foo()函数还有super.foo()，则调用A合约的foo()函数。
- 因为Solidity采用从右往左解析的继承顺序，即C -> B -> A。所以C的super会先指向B，而B的super指向A。


8. 当使用`call`方法发送ETH时，以下两种写法有何本质区别？

```solidity
(1) addr.call{value: 1 ether}("")
(2) addr.transfer(1 ether)
```

主要区别:
- 错误处理：
  - `transfer`: 失败自动回滚整个交易
  - `call`: 返回布尔值表示成功或失败，需要手动检测判定是否成功
- 安全性:
  - `transfer`: 通过gas降低了重入攻击风险
  - `call`: 无gas限制，需要手动防范重入攻击
- Gas限制:
  - `transfer`: 固定为2300 gas,只能执行eth传递
  - `call`: 默认转发所有可用的gas，可以实现调用合约函数的效果
- 兼容性：
  - `transfer`: 由于gas固定，如果后续以太坊的gas计算方式改变，可能导致执行失败
  - `call`: 没什么限制，更推荐使用