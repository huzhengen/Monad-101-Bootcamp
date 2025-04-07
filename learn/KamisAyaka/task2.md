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
6. 请说明`require`、`assert`、`revert`三者的使用场景差异（从触发条件和Gas退还角度）
    ### **1. `require`**
    #### **使用场景**  
    - **外部条件验证**：用于检查用户输入或外部环境是否符合预期（如金额是否足够、参数是否合法）。  
    - **典型用例**：  
      ```solidity
      function buyTicket(uint tickets) public payable {
          require(tickets <= MAX_TICKETS, "超过最大购票数量");
          require(msg.value >= tickets * price, "以太币不足");
          // ...
      }
      ```

    #### **触发条件**  
    - 当条件表达式为`false`时触发。

    #### **Gas退还**  
    - **会退还剩余Gas**：用户承担交易失败的Gas成本，因为问题源于输入错误。

    ---

    ### **2. `assert`**
    #### **使用场景**  
    - **内部逻辑错误检测**：用于检查代码逻辑中“不可能发生”的情况（如数学溢出、状态矛盾）。  
    - **典型用例**：  
      ```solidity
      function transfer(address to, uint amount) public {
          balanceOf[msg.sender] -= amount; // 先减去金额
          assert(balanceOf[msg.sender] + amount >= balanceOf[msg.sender]); // 检测溢出
          balanceOf[to] += amount;
      }
      ```

    #### **触发条件**  
    - 当条件表达式为`false`时触发。

    #### **Gas退还**  
    - **不会退还剩余Gas**：开发者需承担成本，因这表明代码存在逻辑漏洞。

    ---

    ### **3. `revert`**
    #### **使用场景**  
    - **手动回滚交易**：灵活替代`require`，可配合自定义错误信息，适用于复杂条件判断。  
    - **典型用例**：  
      ```solidity
      function divide(uint a, uint b) public pure returns (uint) {
          if (b == 0) {
              revert("除数不能为零");
          }
          return a / b;
      }
      ```

    #### **触发条件**  
    - 调用`revert()`或`revert("错误信息")`时触发。

    #### **Gas退还**  
    - **会退还剩余Gas**：行为与`require`一致，适用于用户可控的错误场景。
---

7. 某合约同时继承A和B合约，两者都有`foo()`函数：

```solidity
contract C is A, B {
    function foo() override(A,B) {...}
}
```

实际执行时会调用哪个父合约的函数？为什么？

当合约 `C` 同时继承 `A` 和 `B` 并重写 `foo()` 时：
**实际执行的是 `C` 自身的 `foo()` 函数**。

#### 原因：
1. **显式覆盖声明**  
   `override(A,B)` 表示 `C` 的 `foo()` **同时覆盖了 `A` 和 `B` 的 `foo()` 函数**。此时，调用 `C` 的 `foo()` 时，**直接执行子类 `C` 的实现**，而非父类的任何版本。

2. **继承冲突解决**  
   如果未使用 `override` 或未明确覆盖，Solidity 会因 `A` 和 `B` 存在同名函数而报错。但在此场景中，`override` 已明确解决了冲突，**子类完全接管了 `foo()` 的逻辑**。

- 若想在 `C` 的 `foo()` 中调用父类的 `foo()`，需通过 `super.foo()`，此时 Solidity **按继承顺序逆序（先 B 后 A）** 查找父类实现。例如：
  ```solidity
  function foo() override(A,B) public {
      super.foo(); // 先调用 B 的 foo()，若 B 也调用 super，则继续到 A
      // ...
  }
  ```
---


8. 当使用`call`方法发送ETH时，以下两种写法有何本质区别？

```solidity
(1) addr.call{value: 1 ether}("")
(2) addr.transfer(1 ether)
```
---

#### **1. Gas 限制**
- **`transfer`**  
  默认仅转发 **2300 gas**（固定值），若接收方合约的 `fallback` 函数需要更多 gas（如修改状态变量），会导致交易失败（**out-of-gas 错误**）。

- **`call`**  
  可通过 `.gas()` 显式指定 gas 量（如 `call.gas(1000000)...`），默认转发所有剩余 gas（取决于调用方的 gas 剩余量）。

---

#### **2. 错误处理**
- **`transfer`**  
  - **直接抛出异常**：若发送失败（如接收方拒绝以太或 gas 不足），会直接 **终止当前交易**（无法捕获错误）。  
  - **典型用法**：  
    ```solidity
    addr.transfer(1 ether); // 失败时直接报错
    ```

- **`call`**  
  - **返回布尔值**：返回 `true` 或 `false` 表示成功与否，**需手动检查结果**。  
  - **可控性更高**：可通过 `require` 或条件判断处理失败情况。  
  - **典型用法**：  
    ```solidity
    bool success = addr.call{value: 1 ether}("");
    require(success, "转账失败");
    ```

---

#### **3. 功能扩展性**
- **`transfer`**  
  仅支持 **单纯发送以太**，无法传递自定义数据。

- **`call`**  
  支持 **附带数据** 的调用（通过第二个参数），例如调用接收方合约的特定函数：  
  ```solidity
  addr.call{value: 1 ether}(abi.encodeWithSignature("deposit()")); // 调用接收方的 deposit 函数
  ```

---

#### **4. 安全性**
- **`transfer`**  
  - **高风险**：若接收方合约的 `fallback` 需要复杂操作且 gas 不足，会导致整个交易回滚。  
  - **适用场景**：接收方是简单钱包地址或确定不需要执行复杂逻辑的合约。

- **`call`**  
  - **更安全**：可通过自定义 gas 和错误处理逻辑，避免因 gas 不足导致交易失败。  
  - **推荐用于**：与复杂合约交互或需传递数据的场景。