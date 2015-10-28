#Login Modal

Alot of people use login modal as their login page so I made a service and controller to handle it.

I also implemented a redirect to page after login.

Example:

```
Auth.notLoginAction($location.path(),{
  action: 'favouriteModel',
  model: scope.id,
  state: scope.favourited,
});
loginModal.loginPopup(scope);
```