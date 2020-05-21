<?php

namespace GeminiLabs\SiteReviews\Modules\Html\Tags;

use GeminiLabs\SiteReviews\Review;

abstract class Tag
{
    /**
     * @var \GeminiLabs\SiteReviews\Arguments
     */
    public $args;

    /**
     * @var \GeminiLabs\SiteReviews\Review
     */
    public $review;

    /**
     * @var string
     */
    public $tag;

    public function __construct($tag, Review $review, array $args = [])
    {
        $this->args = glsr()->args($args);
        $this->review = $review;
        $this->tag = $tag;
    }

    /**
     * @param string $value
     * @return string|null
     */
    abstract public function handle($value);

    /**
     * @param string $path
     * @return bool
     */
    public function isEnabled($path)
    {
        return glsr_get_option($path, true, 'bool');
    }

    /**
     * @param string $path
     * @return bool
     */
    public function isHidden($path = '')
    {
        return in_array($this->tag, $this->args->hide) || !$this->isEnabled($path);
    }
}