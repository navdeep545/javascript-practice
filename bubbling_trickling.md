I'll help you understand event bubbling and capturing through a practical example. Let me write some code that clearly demonstrates both concepts.



```html
<!DOCTYPE html>
<html>
<head>
    <style>
        .box {
            padding: 20px;
            margin: 10px;
            border: 2px solid black;
        }
        #output {
            margin-top: 20px;
            padding: 10px;
            border: 1px solid #ccc;
            min-height: 100px;
        }
    </style>
</head>
<body>
    <!-- Nested structure to demonstrate event propagation -->
    <div id="grandparent" class="box">Grandparent
        <div id="parent" class="box">Parent
            <div id="child" class="box">Child</div>
        </div>
    </div>
    <div id="output"></div>

    <script>
        // Helper function to log events
        function logEvent(event, phase) {
            const output = document.getElementById('output');
            output.innerHTML += `${event.target.id} was clicked (${phase} phase) -> captured by: ${event.currentTarget.id}<br>`;
        }

        // Get all nested elements
        const elements = ['grandparent', 'parent', 'child'].map(id => 
            document.getElementById(id)
        );

        // Add event listeners for capturing phase (true)
        elements.forEach(element => {
            element.addEventListener('click', (e) => {
                logEvent(e, 'capture');
            }, true); // true enables capturing phase
        });

        // Add event listeners for bubbling phase (false)
        elements.forEach(element => {
            element.addEventListener('click', (e) => {
                logEvent(e, 'bubble');
            }, false); // false (default) enables bubbling phase
        });
    </script>
</body>
</html>

```

Let me explain how this code demonstrates event bubbling and capturing:

First, let's understand the structure:
1. We have three nested divs: grandparent → parent → child
2. Each div has a unique color and border to make it visually distinct
3. We're logging events to an output div to see the exact order of execution

When you click on the innermost "child" div, here's what happens:

During the Capturing Phase (top → down):
1. The event travels down from the window
2. Hits grandparent first (capture)
3. Then parent (capture)
4. Finally reaches child (capture)

During the Bubbling Phase (bottom → up):
1. Starts from the target element (child)
2. Bubbles up to parent
3. Then to grandparent
4. Finally to the window

The key parts of the code that make this work:
```javascript
// Capturing phase (true as third parameter)
element.addEventListener('click', handler, true);

// Bubbling phase (false as third parameter)
element.addEventListener('click', handler, false);
```

If you click the child element, you'll see this order of events in the output:
```
grandparent was clicked (capture phase) -> captured by: grandparent
parent was clicked (capture phase) -> captured by: parent
child was clicked (capture phase) -> captured by: child
child was clicked (bubble phase) -> captured by: child
parent was clicked (bubble phase) -> captured by: parent
grandparent was clicked (bubble phase) -> captured by: grandparent
```

This clearly shows how the event:
1. First captures down through all parent elements
2. Then bubbles back up through the same elements

Would you like me to explain any specific part of this process in more detail?