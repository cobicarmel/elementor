#Raw-HTML

Display HTML content in the panel. You can add custom `classes` to the control.

*Returns:* `string`

##Example

```php
$this->add_control(
  'html_msg',
  [
     'type'    => Controls_Manager::RAW_HTML,
  ]
);
```

##Usage

**PHP** *(Under `render()` method)*
```php
...
```

**JS** *(Under `_content_template()` method)*
```html
...
```

##Arguments

Argument       | Required   | Type         | Default                      | Description
------------   | :--------: | :------:     | ---------------------------- | ---------------------------------------------
`label`        | yes        | *`string`*   |                              | The label of the control - displayed next to it
`type`         | yes        | *`string`*   | `Controls_Manager::TEXTAREA` | The type of the control
`default`      | no         | *`string`*   |                              | The default value of the control
`classes`      | no         | *`string`*   |                              | CSS classes to add to the wrapper div of the control
