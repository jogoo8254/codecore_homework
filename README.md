# Todo CLI Assignment


Write an interactive CLI todo list application using Node's readline and fs modules. The following describes what each action does. It would be best to implement each action as its own function.

```

$ node todoCLI.js

Welcome to Todo CLI!
--------------------
(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit
> v

List is empty...

(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit
> n

What?
> Have lunch

(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit
> n

What?
> Fix the climate

(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit
> n

What?
> Go beetle hunting (not rock star kind)

(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit
> v

0 [ ] Have lunch
1 [ ] Fix the climate
2 [ ] Go beetle hunting (not rock star kind)

(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit
> c0

Completed "Have lunch"

(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit
> v

0 [✓] Have lunch
1 [ ] Fix the climate
2 [ ] Go beetle hunting (not rock star kind)

(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit
> d2

Deleted "Go beetle hunting (not rock star kind)"

(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit
> v

0 [✓] Have lunch
1 [ ] Fix the climate

(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit
> c1

Completed "Fix the climate"

(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit
> v

0 [✓] Have lunch
1 [✓] Fix the climate

(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit
> q
See you soon! 😄

$
```
