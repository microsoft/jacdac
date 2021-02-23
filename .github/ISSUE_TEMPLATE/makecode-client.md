---
name: MakeCode client
about: Procedure to add a new service client to pxt-jacdac
title: Add MakeCode client for ...
labels: makecodeintegration
assignees: ''

---

Before implemeting a MakeCode client, make sure that the service has a simulator in jacdac-ts. It will make the testing much easier.

### Build

- [ ] create a new branch in ``pxt-jacdac``, ``client/SERVICENAME``
- [ ] run ```yarn buildpxt`` to update the constants in pxt-jacdac
- [ ] go to the service folder in ``pxt-jacdac``, rename ``pxt.g.json`` to ``pxt.json``

If the code in ``client.g.ts`` is good enough, don't modify it and skip the next step.

- [ ] rename ``client.g.ts`` to ``client.ts`` and update the code so that it works well in makecode
- [ ] add a ``test.ts`` file, with a single line comment

```
// add tests here
```

### Testing

- [ ] push your changes to github
- [ ] open your project folder in makecode multi and import your project folder in micro:bit beta.

```
https://makecode.com/multi?jacdac=1&localhost=1&beta=1#
```
- [ ] write tests in ``test.ts``
- [ ] commit back your changes
- [ ] wait for build to complete
- [ ] merge and bump from MakeCode
