## 第二章：Solidity 快速入门

### 一、填空题

1. Solidity中存储成本最高的变量类型是`storage`变量，其数据永久存储在区块链上。  
2. 使用`constant`关键字声明的常量可以节省Gas费，其值必须在编译时确定。  
3. 当合约收到不带任何数据的以太转账时，会自动触发`receive`函数。  

---

### 二、选择题

4. 函数选择器(selector)的计算方法是：  B
   **A)** sha3(函数签名)  
   **B)** 函数名哈希的前4字节  
   **C)** 函数参数的ABI编码  
   **D)** 函数返回值的类型哈希  

5. 以下关于mapping的叙述错误的是：  C
   **A)** 键类型可以是任意基本类型  
   **B)** 值类型支持嵌套mapping  
   **C)** 可以通过`length`属性获取大小  
   **D)** 无法直接遍历所有键值对  

---

### 三、简答题

6. 请说明`require`、`assert`、`revert`三者的使用场景差异（从触发条件和Gas退还角度）

 require(条件判断)
 - 条件: 验证外部输入或前置条件，如参数合法性、状态合规性（例如 require(msg.sender == owner)）	
 - Gas 退还: 触发 REVERT，退还剩余Gas	
 - 使用场景: 用户输入检查、权限验证

assert(断言) 
- 条件: 检测代码逻辑错误或不可能发生的状态
- Gas 退还: 触发 INVALID，消耗所有Gas	
- 使用场景: 内部一致性检查（如数学运算后验证数据）

revert(主动回滚)
- 条件: 主动对某个逻辑进行判断并发起回滚
- Gas 退还: 触发 REVERT，退还剩余Gas	
- 使用场景: 分支条件中的主动回滚（可附加错误信息）

7. 某合约同时继承A和B合约，两者都有`foo()`函数：

```solidity
contract C is A, B {
    function foo() override(A,B) {...}
}
```

实际执行时会调用哪个父合约的函数？为什么？

执行 B合约的foo()函数（最后声明的最优先）。


8. 当使用`call`方法发送ETH时，以下两种写法有何本质区别？

```solidity
(1) addr.call{value: 1 ether}("")
(2) addr.transfer(1 ether)
```

主要有 Gas 限制和对于异常情况的处理方式不同 
Call 的用法: 
- 可自定义或默认传递所有剩余Gas（可能引发重入攻击）	
- 失败返回 (bool, bytes)，不自动回滚	

transfer 的用法:
- 固定 2300 Gas（足够记录日志但禁用复杂逻辑）
- 失败触发 revert()，自动回滚

