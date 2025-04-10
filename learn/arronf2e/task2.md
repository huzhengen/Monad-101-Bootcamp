## 第二章：Solidity 快速入门

### 一、填空题

1. Solidity中存储成本最高的变量类型是`storage`变量，其数据永久存储在区块链上。  
2. 使用`constant`关键字声明的常量可以节省Gas费，其值必须在编译时确定。  
3. 当合约收到不带任何数据的以太转账时，会自动触发`receive`函数。  

---

### 二、选择题

4. 函数选择器(selector)的计算方法是： A

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

6. 请说明require、assert、revert三者的使用场景差异（从触发条件和Gas退还角度）
   
   - `require`：验证失败会退还剩余gas，一般用于用户输入校验，可自定义错误信息
   - `assert`：验证失败会消耗所有gas，一般用于检测代码逻辑错误，不可自定义错误信息
   - `revert`：可结合条件语句灵活使用，支持自定义错误（Solidity 0.8.4+），会退还剩余gas

7. 某合约同时继承A和B合约，两者都有`foo()`函数：

```solidity
contract C is A, B {
    function foo() override(A,B) {...}
}
```

实际执行时会调用哪个父合约的函数？为什么？

  答：实际调用顺序由继承声明的顺序决定
  
  1. 调用顺序遵循"从右到左"的继承链（与声明顺序相反）
  2. 实际执行时会 优先调用B的foo() ，因为：
     - 继承顺序是 A, B （从左到右声明）
     - 但Solidity使用C3线性化算法，实际查找顺序是：C -> B -> A
     - 因此会先找到B的实现

## 8. 当使用`call`方法发送ETH时，以下两种写法有何本质区别？

```solidity
(1) addr.call{value: 1 ether}("")
(2) addr.transfer(1 ether)
```

在Solidity中，`call{value:}()`和`transfer()`虽然都能发送ETH，但存在关键区别：

### 1. `addr.call{value: 1 ether}("")`
- **Gas处理**：会转发所有剩余gas
- **错误处理**：返回`(bool success, )`需手动检查
- **安全性**：低，可能触发接收合约的fallback函数中的恶意代码
- **推荐场景**：需要与接收合约交互时（如调用特定函数）

```solidity
(bool success, ) = addr.call{value: 1 ether}("");
require(success, "Transfer failed"); // 必须手动检查
```

### 2. `addr.transfer(1 ether)`
- **Gas限制**：固定2300 gas（防重入攻击）
- **错误处理**：失败时自动revert
- **安全性**：高，适合单纯转账
- **推荐场景**：简单ETH转账给EOA或可信合约

```solidity
addr.transfer(1 ether); // 自动处理错误
```

当前推荐做法（Solidity ≥0.8.0）：
- 单纯转账 → 优先使用`transfer()`
- 需要交互 → 使用`call`但必须：
  1. 检查返回值
  2. 考虑重入防护
  3. 遵循Checks-Effects-Interactions模式
